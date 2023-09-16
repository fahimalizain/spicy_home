import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { HungerstationClient } from '../swr/hungerstation';

type HungerstationContextValue = {
  client: HungerstationClient;
};

const HungerstationContext = createContext<
  HungerstationContextValue | undefined
>(undefined);

const HungerstationProvider = ({ children }: { children: ReactNode }) => {
  const hungerstation = useState(
    () =>
      new HungerstationClient(
        process.env.NEXT_PUBLIC_HS_USERNAME as string,
        process.env.NEXT_PUBLIC_HS_PASSWORD as string
      )
  )[0];

  const [isAuthenticated, _setAuthenticated] = useState(false);

  useEffect(() => {
    const setAuthenticated = async () => {
      _setAuthenticated(false);
      while (!hungerstation.isAuthenticated()) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      _setAuthenticated(true);
    };

    setAuthenticated();
  }, [hungerstation]);

  if (!isAuthenticated) {
    return <div>Loading</div>;
  }

  return (
    <HungerstationContext.Provider value={{ client: hungerstation }}>
      {children}
    </HungerstationContext.Provider>
  );
};

const useHungerstation = () => {
  const value = useContext(HungerstationContext);
  if (!value) {
    throw new Error(
      'useHungerstation must be used within a HungerstationProvider'
    );
  }
  return value.client;
};

export { HungerstationProvider, useHungerstation };
