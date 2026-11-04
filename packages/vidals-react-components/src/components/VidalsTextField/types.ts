import type { ReactNode } from 'react';
import type { FieldErrorProps, TextFieldProps } from 'react-aria-components';

interface BaseFieldProps extends Omit<TextFieldProps, 'children' | 'type'> {
  /** Persistent visible label, programmatically associated with the native control. */
  label: string;
  /** Optional help text announced with the input. */
  description?: ReactNode;
  /** Shown when invalid. If omitted, React Aria supplies the validation message. */
  errorMessage?: FieldErrorProps['children'];
  placeholder?: string;
  /** Applied to the input/textarea, rather than its wrapper. */
  controlClassName?: string;
  /** Native control ref; pass the form library's field ref for focus-on-error. */
  controlRef?: (element: HTMLInputElement | HTMLTextAreaElement | null) => void;
}

/** A labeled native input, or a textarea when multiline is set. */
export type VidalsTextFieldProps = BaseFieldProps &
  (
    | { multiline?: false; type?: TextFieldProps['type']; rows?: never }
    | { multiline: true; type?: never; rows?: number }
  );
