import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { ClientsService } from '../../shared/services/api/clients/ClientsService';
import { ToolsListing } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { MapsDashboard } from './components/Maps';

export const Dashboard = () => {
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [totalCountClients, setTotalCountClients] = useState(0);

  useEffect(() => {
    setIsLoadingClients(true);

    ClientsService.getAll(1).then((result) => {
      setIsLoadingClients(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountClients(result.totalCount);
      }
    });
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Página inicial"
      barraDeFerramentas={<ToolsListing mostrarBotaoNovo={false} />}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <MapsDashboard />

        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
