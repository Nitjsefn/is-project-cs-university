import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography } from '@mui/material';

interface PopularityRecord {
  language: string;
  month: string;
  popularity: number;
}

interface CVERecord {
  language: string;
  date: string;
}

const Chart = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const langRes = await axios.get<PopularityRecord[]>('/api/v1/languages');
      const cveRes = await axios.get<CVERecord[]>('/api/v1/vulnerabilities');

      const popularityMap = new Map<string, number[]>();
      const cveMap = new Map<string, number[]>();
      const monthsSet = new Set<string>();

      langRes.data.forEach(({ language, month, popularity }) => {
        const key = language;
        if (!popularityMap.has(key)) popularityMap.set(key, []);
        popularityMap.get(key)!.push(popularity);
        monthsSet.add(month);
      });

      const allMonths = Array.from(monthsSet).sort();
      setLabels(allMonths);

      // count CVE per month per language
      const groupedCVE = new Map<string, Map<string, number>>();
      cveRes.data.forEach(({ language, date }) => {
        const month = date.slice(0, 7);
        if (!groupedCVE.has(language)) groupedCVE.set(language, new Map());
        const map = groupedCVE.get(language)!;
        map.set(month, (map.get(month) || 0) + 1);
      });

      // prepare CVE series
      groupedCVE.forEach((monthMap, language) => {
        const data = allMonths.map(m => monthMap.get(m) || 0);
        cveMap.set(language, data);
      });

      // build chart series
      const finalSeries: any[] = [];
      popularityMap.forEach((popData, lang) => {
        finalSeries.push({ id: `${lang}-Popularność`, data: popData, label: `${lang} - Popularność` });
      });
      cveMap.forEach((cveData, lang) => {
        finalSeries.push({ id: `${lang}-CVE`, data: cveData, label: `${lang} - CVE` });
      });

      setSeries(finalSeries);
    };

    fetchData();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>
        Wykres popularności języków i liczby CVE w czasie
      </Typography>
      <LineChart
        xAxis={[{ scaleType: 'point', data: labels }]}
        series={series}
        width={1000}
        height={500}
      />
    </Box>
  );
};

export default Chart;