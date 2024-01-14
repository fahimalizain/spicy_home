import useSWRImmutable from 'swr/immutable';
import { GetReportsResponse } from '../pages/api/report';

export const useReport = (from: string, to: string) =>
  useSWRImmutable<GetReportsResponse, Error, string[] | null>(
    from && to ? ['report', from, to] : null,
    () => {
      return fetch(`/api/report?from=${from}&to=${to}`).then((res) =>
        res.json()
      );
    }
  );
