import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from './RouterProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const CommonProvider:FC<PropsWithChildren> = () => {
  
    const queryClient = new QueryClient()

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={queryClient} >
              <BrowserRouter/>
          </QueryClientProvider>
        </LocalizationProvider>
    );
  }