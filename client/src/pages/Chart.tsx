import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { CircularProgress, Box, Typography } from '@mui/material';

interface ChartProps {
  token: string;
  language: string;
  startDate: string;
  endDate:   string;
}

interface LangRow {
  Date: string;
  [lang: string]: any;
}

interface CVEEntry {
  pub_date: string;
}

const API_BASE = 'http://localhost:3000/api/v1';

const Chart: React.FC<ChartProps> = ({ token, language, startDate, endDate }) => {
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [months, setMonths]         = useState<string[]>([]);
  const [popularityValues, setPopularityValues] = useState<number[]>([]);
  const [cveCounts, setCveCounts]   = useState<number[]>([]);

        const startD = startDate.slice(0,7);
    	const endD   = endDate.slice(0,7);
  useEffect(() => {
    if (!token) {
      setError('Access denied');
      setLoading(false);
      return;
    }





    async function fetchData() {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [langRes, vulnRes] = await Promise.all([
          fetch(`${API_BASE}/languages`,      { headers }),
          fetch(`${API_BASE}/vulnerabilities`,{ headers }),
        ]);
        if (!langRes.ok || !vulnRes.ok) {
          throw new Error(`Downloading error: ${langRes.status}/${vulnRes.status}`);
        }

        const langs: LangRow[]  = await langRes.json();
        const vulns: CVEEntry[] = await vulnRes.json();

        const filteredLangs = langs.filter(r => {
          const m = r.Date.slice(0, 7);
          return m >= startD && m <= endD;
        });

        const monthLabels = filteredLangs.map(r => r.Date.slice(0, 7));
        setMonths(monthLabels);

        const popularityArr = filteredLangs.map(r => Number(r[language] ?? 0));
        setPopularityValues(popularityArr);

        const vulnsInRange = vulns.filter(v => {
          const m = v.pub_date.slice(0, 7);
          return m >= startD && m <= endD;
        });

        const countsByMonth = vulnsInRange.reduce((acc, v) => {
          const m = v.pub_date.slice(0, 7);
          acc[m] = (acc[m] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const cveArr = monthLabels.map(m => countsByMonth[m] || 0);
        setCveCounts(cveArr);

        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [token, language, startD, endD]);


  if (loading) return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <CircularProgress />
    </Box>
  );
  if (error) return (
    <Typography color="error" align="center" sx={{ mt: 4 }}>
      {error}
    </Typography>
  );

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" align="center" mb={2}>
        Popularność {language} vs. Liczba CVE ({startD}–{endD})
      </Typography>
      <LineChart
        xAxis={[{ scaleType: 'band', data: months, label: 'Month' }]}
        yAxis={[
          { id: 'cve', position: 'left',  label: 'CVE Count',       min: 0 }
        
        ]}
     
  series={[
    {
      label: `Popularity of ${language}`,
      data: popularityValues.map(v => v * 50),
      yAxisKey: 'pop',
      valueFormatter: value => {const original = value / 50;return `${original.toFixed(1)}`;}
    },
    {
      label: 'CVE Count',
      data: cveCounts,
      yAxisKey: 'cve'
    }
  ]}
  height={400}
  width={800}
/>


    </Box>
  );
};

export default Chart;

