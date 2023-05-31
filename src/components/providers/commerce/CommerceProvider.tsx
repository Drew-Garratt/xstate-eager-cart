import { createContext, ReactNode } from 'react';
import { useInterpret } from '@xstate/react';
import { storeMachine, StoreService } from '@/lib/vercelCommerce/machine';

/**
 * Service imports
 *
 * Service imports are API/Implementation spefecic functions and so
 * are imported from the relevant lib folder
 */
import services from '@/lib/adapter/commerceMachine/services';

/**
 * Action and Guard imports
 *
 * Actions and guards are machine specific functions are imported
 * from the vercelCommerceMachine folder and assigned to the machine
 */
import actions from '@/lib/vercelCommerce/machine/actions';
import guards from '@/lib/vercelCommerce/machine/guards';

/**
 * Type for the cart context value
 *
 * This will be used in the creation of our context and provides
 * a undefined fallback that can be used to check if the context
 * has been provided in accompanying hooks and components
 */
type StoreContextType = StoreService | undefined;

/**
 * Cart Context
 *
 * This context will be used to provide the cart machine to the rest of the application
 */
export const StoreContext = createContext<StoreContextType>(undefined);

/**
 * Cart Provider
 *
 * This component will provide the cart machine to the rest of the application
 * @param input: { children: ReactNode }
 * @returns
 */
export const CommerceProvider = ({ children }: { children: ReactNode }) => {
  /**
   * Create a cart machine using the useInterpret hook
   * The useInterpret hook will create a machine and start it
   * the machine will be returned as a service.xState services can be used to send events to the machine.
   *
   * React components can use the useService hook to subscribe to the service.
   *
   * useSelector can be used to subscribe to the specific values in state without triggering a re-render for every state change.
   */
  const storeService = useInterpret(
    storeMachine,
    {
      // Enable devTools in development
      devTools: process.env.NODE_ENV === 'development',
      /**
       * Services
       *
       * Services are actors that invoked by the machine when a transition to a given state occurs.
       * Actors can be used to make API calls, perform side effects, or anything else that is synchronous effect.
       * https://stately.ai/docs/xstate/actors/actions-vs-actors
       */
      services,
      /**
       * Actions
       *
       * Actions are functions that are executed when a transition occurs.
       * Here we load actions from the actions folder and assign them to machine.
       */
      actions,
      /**
       * Guards
       *
       * Guards are functions that are executed when a transition occurs.
       * They are used to determine if a transition should occur
       */
      guards,
    },
    (state) => {
      // subscribes to state changes
      console.log(state);
    }
  );

  return (
    <StoreContext.Provider value={storeService}>
      {children}
    </StoreContext.Provider>
  );
};
