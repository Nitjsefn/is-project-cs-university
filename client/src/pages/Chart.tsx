import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { CircularProgress, Box, Typography } from '@mui/material';

interface LanguageItem {
  month: string;
  popularity: number;
}

interface VulnerabilityItem {
  month: string;
  count: number;
}

const API_BASE = 'http://localhost:3000/api/v1';

const CveLanguagesChart: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [xLabels, setXLabels] = useState<string[]>([]);
  const [popularityY, setPopularityY] = useState<number[]>([]);
  const [vulnerabilitiesY, setVulnerabilitiesY] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [langRes, vulnRes] = await Promise.all([
          fetch(`${API_BASE}/languages`),
          fetch(`${API_BASE}/vulnerabilities`)
        ]);
        if (!langRes.ok || !vulnRes.ok) throw new Error('Błąd pobierania danych');

        const langs: LanguageItem[] = await langRes.json();
        const vulns: VulnerabilityItem[] = await vulnRes.json();

        // Zakładamy, że miesiące są te same i w tej samej kolejności
        const months = langs.map(item => item.month);
        const popValues = langs.map(item => item.popularity);
        const vulnValues = vulns.map(item => item.count);

        setXLabels(months);
        setPopularityY(popValues);
        setVulnerabilitiesY(vulnValues);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" mb={2} align="center">
        Popularność języków vs. Liczba CVE w miesiącach
      </Typography>
      <LineChart
        xAxis={[{ scaleType: 'band', data: xLabels, label: 'Miesiąc' }]}
        series={[
          { label: 'Popularność języków', data: popularityY },
          { label: 'Liczba CVE', data: vulnerabilitiesY }
        ]}
        height={400}
        width={800}
      />
    </Box>
  );
};

export default CveLanguagesChart;

