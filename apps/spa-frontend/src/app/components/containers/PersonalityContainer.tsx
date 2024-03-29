import React, { ReactElement } from 'react';
import { AuthenticationFormProps } from '../AuthenticationForm';

export function PersonalityContainer({
  children,
}: {
  children: ReactElement<AuthenticationFormProps>;
}) {
  return React.cloneElement(children);
}
