import useSWR from 'swr';

export default function useFetch<T>(url: string, options: RequestInit) {
  return useSWR<T>(url, (apiURL: string) => fetch(apiURL, options).then(res => res.json()));
}