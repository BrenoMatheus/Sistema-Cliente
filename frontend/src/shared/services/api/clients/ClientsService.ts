import { AxiosError } from 'axios';

import { Environment } from '../../../environment';
import { Api } from '../axios-config';


export interface IListClient {
  id: number,
  name: string,
  email: string,
  telephone: number,
  longitude:string,
  latitude:string,
}

export interface IDetailClient {
  id: number,
  name: string,
  email: string,
  telephone: number,
  longitude:string,
  latitude:string,
}

type TClientTotalCount = {
  data: IListClient[];
  totalCount: number;
}

const getAll = async (page = 1, filter = '', id = 0): Promise<TClientTotalCount | Error> => {
  try {
    const urlRelativa = `/clients?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}&id=${id}`;

    const { data, headers } = await Api().get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetailClient | Error> => {
  try {
    const { data } = await Api().get(`/clients/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetailClient, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api().post<number>('/clients', dados);

    if (data) {
      return data;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetailClient): Promise<void | Error> => {
  try {
    await Api().put(`/clients/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api().delete(`/clients/${id}`);
  } catch (error) {
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao apagar o registro.');
  }
};


export const ClientsService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
