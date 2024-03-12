import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { ClientsService } from '../../shared/services/api/clients/ClientsService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { DetailTool } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

interface IFormData {
  name: string;
  email: string;
  telephone: number;
  longitude: string;
  latitude: string;
}
const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required().min(3).max(70),
  email: yup.string().required().email(),
  telephone: yup.number().required(),
  longitude: yup.string().required(),
  latitude: yup.string().required(),
});

export const DetailClients: React.FC = () => {
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      ClientsService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate('/clients');
        } else {
          setName(result.name);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        setName: '',
        setSerieNumber: '',
        setType: '',
        setDescription: '',
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === 'nova') {
          ClientsService.create(dadosValidados).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/clients');
              } else {
                navigate(`/clients/detail/${result}`);
              }
            }
          });
        } else {
          ClientsService.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/clients');
              }
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      ClientsService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/clients');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'New Client' : name}
      barraDeFerramentas={
        <DetailTool
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmVoltar={() => navigate('/clients')}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/clients/detail/nova')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Register Client</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item direction="column">
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <VTextField
                    fullWidth
                    name="name"
                    label="Nome"
                    disabled={isLoading}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item direction="column">
                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                  <VTextField
                    fullWidth
                    name="telephone"
                    label="Telefone"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name="email"
                  label="Email"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item direction="column">
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <VTextField
                    fullWidth
                    name="longitude"
                    label="Longitude"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid item direction="column">
                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                  <VTextField
                    fullWidth
                    name="latitude"
                    label="Latitude"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
