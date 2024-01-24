# David Ripplinger's notes on architecture

Note that some examples here use styled components for styling or even some conditional logic in the css, but it shouldn't be too hard to adapt to tailwind.

## src/components

This folder is meant to contain highly reused components that you want to keep the design of standardized throughout the frontend app. For example, it's best to keep components in here like Link, Button, Modal, Select, Search, and so on.

Here is an example from another project of how Button could be done so that it keeps the style consistent and locked down but allows several variants:

```
import { ReactNode } from "react";
import styled from "styled-components";
import type {} from "styled-components/cssprop";
import { palette } from "../../stylevars";

const LinkButton = styled.button<{ margin: string; width?: string }>`
  display: inline-flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: ${(p) => p.margin};
  ${(p) => (p.width ? `width: ${p.width};` : "")}
  &:disabled {
    cursor: not-allowed;
  }
  background-color: transparent;
  color: ${palette.link};
  &:disabled {
    color: ${palette.linkDisabled};
  }
`;

const PlainButton = styled.button<{ margin: string; width?: string }>`
  display: inline-flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: ${(p) => p.margin};
  ${(p) => (p.width ? `width: ${p.width};` : "")}
  &:disabled {
    cursor: not-allowed;
  }
  background-color: transparent;
  &:disabled {
    color: ${palette.linkDisabled};
  }
`;

const IconButton = styled.button<{ margin: string; width?: string }>`
  display: inline-flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: ${(p) => p.margin};
  ${(p) => (p.width ? `width: ${p.width};` : "")}
  &:disabled {
    cursor: not-allowed;
  }
  background-color: transparent;
  padding: 4px;
  &:hover {
    background-color: rgba(128, 128, 128, 0.2);
  }
`;

type TVariant = "primary" | "secondary" | "icon" | "link" | "danger" | "plain";

const primary = `
  border-color: ${palette.primary};
  background-color: ${palette.primary};
  color: ${palette.primaryTextComplement};
  &:hover {
    border-color: ${palette.primaryHighlight};
    background-color: ${palette.primaryHighlight};
  }
  &:disabled {
    border-color: ${palette.primaryDisabled};
    background-color: ${palette.primaryDisabled};
    color: ${palette.primaryTextComplement};
  }
`;

const secondary = `
  border-color: ${palette.secondary};
  background-color: ${palette.secondary};
  color: ${palette.primaryTextComplement};
  &:hover {
    border-color: ${palette.secondaryHighlight};
    background-color: ${palette.secondaryHighlight};
  }
  &:disabled {
    border-color: ${palette.primaryDisabled};
    color: ${palette.primaryDisabled};
  }
`;

const danger = `
  border-color: ${palette.error};
  background-color: ${palette.error};
  color: ${palette.errorTextComplement};
  &:hover {
    border-color: ${palette.errorHighlight};
    background-color: ${palette.errorHighlight};
  }
  &:disabled {
    border-color: ${palette.errorDisabled};
    background-color: ${palette.errorDisabled};
    color: ${palette.errorTextComplement};
  }
`;

const BaseButton = styled.button<{
  margin: string;
  width?: string;
  variant: TVariant;
}>`
  display: inline-flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: ${(p) => p.margin};
  ${(p) => (p.width ? `width: ${p.width};` : "")}
  &:disabled {
    cursor: not-allowed;
  }
  ${(p) =>
    p.variant === "secondary"
      ? secondary
      : p.variant === "danger"
      ? danger
      : primary}
  padding: 0 16px;
  height: 48px;
  border-style: solid;
  border-width: 1px;
  border-radius: 24px;
  font-weight: 700;
  min-width: 120px;
  ${(p) => (p.width ? `width: ${p.width};` : "")}
`;

interface IProps {
  onClick?: () => void;
  children: ReactNode;
  variant: TVariant;
  width?: string;
  margin?: string;
  disabled?: boolean;
  id?: string;
}

const Button = ({
  onClick = () => {},
  children,
  variant = "primary",
  width,
  margin = "0",
  disabled = false,
  id,
}: IProps) => {
  if (variant === "link") {
    return (
      <LinkButton
        width={width}
        onClick={onClick}
        id={id}
        disabled={disabled}
        margin={margin}
      >
        {children}
      </LinkButton>
    );
  }

  if (variant === "plain") {
    return (
      <PlainButton
        width={width}
        onClick={onClick}
        id={id}
        disabled={disabled}
        margin={margin}
      >
        {children}
      </PlainButton>
    );
  }

  if (variant === "icon") {
    return (
      <IconButton
        width={width}
        onClick={onClick}
        id={id}
        disabled={disabled}
        margin={margin}
      >
        {children}
      </IconButton>
    );
  }

  return (
    <BaseButton
      variant={variant}
      width={width}
      onClick={onClick}
      id={id}
      disabled={disabled}
      margin={margin}
    >
      {children}
    </BaseButton>
  );
};

export default Button;
```

Side note: In this example, I have a variant of Button that is a LinkButton because I've found over the years that it's best to actually use the button html tag whenever you want it to function like a button, even if it looks like a link in styling; and the converse for links that look like buttons.

2nd side note: In this example, I reference a file src/stylevars.ts. Call it whatever you want, but that's a great place to put constants to control your theme across the app, such as colors. In your case, you may however find it easier to just reference things like colors directly with the tailwind class names. Your call.

## src/utils

Same idea as src/components, but it's not for React components. It's for regular functions that a frequently used throughout the app or are very generic. Note that this is NOT for hooks. If you need to write a hook, usually keep it with the component that will use it. If it's a frequently used hook, promote it to a higher folder as necessary, but not in utils.

## React router and src/pages

You had already made main.tsx as the entry point for the app, and I left it that way. But you had previously made app.tsx as the entry point. I changed that to instead use React Router as the entry point in main.tsx, where routes to different paths are delineated in the same file in a straightforward manner. The documentation for React Router is very thorough and easy to navigate.

You'll see that right now the only route in there is for the path `/`. The plan was to also add a path for `/login`, and you can decide whether you want the main dashboard of the app after logging in to also be at `/` (where it loads differently based on login status) or to be at its own route such as `/app`. It depends what you want the user to see in the browser URL in each scenario and whether you want a logged in user to still see the public home page or not.

My intent is for src/pages to be where most of the code exists, where each page is then added as a route to React Router. If a page (let's use Foobar for an example) needs to be broken down into many components, change src/pages/Foobar.tsx to instead be something like src/pages/Foobar/Foobar.tsx with Comp1.tsx, Comp2.tsx, etc also in the folder Foobar. If, say, Comp1.tsx is also too big, make a folder for it and have Comp1/Comp1.tsx and then SubCompA.tsx and SubCompB.tsx inside the Comp1 folder.

**In general, keep code used just for a parent component inside that parent's folder.** This will correspond visually with the component hierarchy on the screen. **Only promote a child component to a higher folder when it needs to be shared with another component,** so that the import statement in the 2nd component doesn't have to go up folders and then dig down in a folder it has no business being in. If quite a few components need to use the child component, it might be time to promote it into src/components. Same goes for regular functions (src/utils if necessary) and hooks (promote to wherever makes sense higher up, if necessary).

Side note: If you were to ever do a nextjs project, it routes pages like this automatically, doing something like a src/pages folder. The only difference is that with nextjs you have to be careful what subfolders you make, since that is how nextjs interprets deeper routing paths. Consequently, nextjs doesn't need React Router.

2nd side note: If you need to have a consistent layout between multiple pages (e.g. a navbar or a footer for all pages), React Router has good documentation on how to do layout components for multiple routes.

## Authentication management

You'll have a somewhat unique way of logging the user in, but here are some guidelines of the framework you can put it in.

With React Router, you can determine which pages require the user to be logged in for them to even see. In a Vite or create-react-app project, such as this one, I like to have the following wrapper component:

```
function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth?.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
```

I define it inside main.tsx and use it there, wrapping it around each component in the routes that I want to protect. Navigate and useLocation are from React Router.

I then have a separate file src/AuthProvider.tsx which is where useAuth is imported from. Here's a basic structure for AuthProvider.tsx:

```
// This interface is specific to the AuthProvider. You might use another interface for fetching a full user object from the backend.
interface User {
  email: string;
  token: string;
  id?: string;
  token_expiration?: number;
  keepSignedIn?: boolean;
}

interface IForgotPassword {
  email: string;
}

interface IConfirmPassword {
  email: string;
  code: string;
  password: string;
}

interface IVerifyEmail {
  email: string;
  code: string;
}

interface ILogin {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface IRegister {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (args: ILogin, callback?: (data?: any) => void) => Promise<number>; // returns the response status
  logout: () => Promise<void>;
  register: (args: IRegister) => Promise<AxiosResponse>;
  updateUser: (user: User) => void;
  forgotPassword: (args: IForgotPassword, callback: VoidFunction) => Promise<void>;
  confirmPassword: (args: IConfirmPassword, callback: VoidFunction) => Promise<void>;
  verifyEmail: (args: IVerifyEmail, callback: VoidFunction) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function saveUserToStorage(user: User) {
  const userAsJson = JSON.stringify(user);
  localStorage.setItem("user", userAsJson);
}

function getUserFromStorage(): User | null {
  const fromLocalStorage = localStorage.getItem("user");

  if (fromLocalStorage) {
    return JSON.parse(fromLocalStorage);
  } else {
    return null;
  }
}

function setDefaultHeaders(oldUser: User | null, newUser: User | null) {
  // Setting the Authorization header if it has changed
  if (oldUser?.token !== newUser?.token) {
    // If the new one is present, set it. Otherwise, delete the old one.
    if (newUser?.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${newUser?.token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  // queryClient is used here if you use react-query. Otherwise, remove.
  const queryClient = useQueryClient();
  // This is from React Router
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const theUser = getUserFromStorage();
    setDefaultHeaders(null, theUser);
    return theUser;
  });

  const updateUser = useCallback(
    (newUser: User | null) => {
      setUser(newUser);
      setDefaultHeaders(user, newUser);
      if (newUser) {
        saveUserToStorage(newUser);
      } else {
        localStorage.removeItem("user");
      }
      queryClient.invalidateQueries();
    },
    [queryClient, user],
  );

  const forgotPassword = useCallback(async (args: IForgotPassword, callback: VoidFunction) => {
    const { email } = args;
    const response: any = await apiForgotPassword({ email_address: email });
    if (response.status === 204) {
      callback();
    } else if (response.status >= 400) {
      throw new Error(response?.data?.message ? response.data.message : "Failed to reset password.");
    }
  }, []);

  const confirmPassword = useCallback(async (args: IConfirmPassword, callback: VoidFunction) => {
    const { email, password, code } = args;
    const response: any = await apiConfirmPassword({ email_address: email, code, new_password: password });
    if (response.status === 204) {
      callback();
    } else if (response.status >= 400) {
      throw new Error(response?.data?.message ? response.data.message : "Failed to reset password.");
    }
  }, []);

  const verifyEmail = useCallback(async (args: IVerifyEmail, callback: VoidFunction) => {
    const { email, code } = args;
    const response = await apiVerifyEmail({ email_address: email, code });
    if (response.status === 201) {
      callback();
    } else {
      throw new Error("/verify-email did not return a 201 status");
    }
  }, []);

  const login = useCallback(
    async (args: ILogin, callback?: (data?: any) => void) => {
      const { email, password } = args;
      const response = await apiLogin({ email_address: email, password });
      if (response.status === 200 && response.data) {
        updateUser({
          email,
          token: response.data.token,
          token_expiration: response.data.token_expiration,
          keepSignedIn: !!args.rememberMe,
          ...response.data.user,
        });
        callback && callback(response.data);
      }
      return response.status;
    },
    [updateUser],
  );

  const logout = useCallback(async () => {
    await apiLogout();
    updateUser(null);
    queryClient.resetQueries();
    navigate("/");
  }, [updateUser, navigate, queryClient]);

  const register = useCallback(async (args: IRegister) => {
    const { email, password } = args;
    const response = await apiRegister({ email_address: email, password });
    return response;
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      updateUser,
      forgotPassword,
      confirmPassword,
      verifyEmail,
    }),
    [
      user,
      login,
      logout,
      register,
      updateUser,
      forgotPassword,
      confirmPassword,
      verifyEmail,
    ],
  );

  return <AuthContext.Provider value={value}>{sessionReady && children}</AuthContext.Provider>;
}

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };

export default AuthProvider;
```

You will need to wrap the whole app (in main.tsx) with AuthProvider, in addition to wrapping each route with the previously mentioned RequireAuth.

The above example code references several functions that begin with "api". Since you are using trpc, these might best be replaced by your own trpc functions. Also, adjust assumptions about api response codes if necessary (I can't remember if trpc handles errors differently from a restful setup). Also, this code assumes you're using JWTs for authentication, and it's putting the JWT into the Authorization header as a bearer token, using axios. This will probably need to be changed, and you'll need to look into how you handle the token with trpc calls (or whatever you use instead of a JWT if you don't use that).

The useAuth hook provides several context-based functions you can use on various pages to manage the user session, as seen in the context value at the end of the component.

## Deleted code

At one point, there was a bit of code you had written that I deleted in one of my pull requests. I had to move it out of the way for the time being, but it seemed like you were starting to figure out some stuff related to your unique login flow. Just giving you a heads up that I did that, and if you still need to find that code to refer to it, you should see it in one of the pull request diffs or by simply looking at an older commit of the repo.
