import {
  composeRenderProps,
  FieldError,
  Input,
  Label,
  Text,
  TextArea,
  TextField,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import {
  controlStyles,
  descriptionStyles,
  errorStyles,
  fieldStyles,
  labelStyles,
  multilineStyles,
} from './styles.js';
import type { VidalsTextFieldProps as Props } from './types.js';

/**
 * A labeled field with native validation, form submission and read-only semantics.
 * @example
 * ```tsx
 * <VidalsTextField label="Email address" type="email" isRequired />
 * ```
 */
export function VidalsTextField(props: Props) {
  const {
    label,
    description,
    errorMessage,
    multiline,
    rows,
    placeholder,
    className,
    controlClassName,
    controlRef,
    ...fieldProps
  } = props;
  const classes = twMerge(controlStyles, multiline && multilineStyles, controlClassName);

  return (
    <TextField
      {...fieldProps}
      className={composeRenderProps(className, (classes) => twMerge(fieldStyles, classes))}
    >
      <Label className={labelStyles}>{label}</Label>
      {multiline ? (
        <TextArea ref={controlRef} rows={rows ?? 4} placeholder={placeholder} className={classes} />
      ) : (
        <Input ref={controlRef} placeholder={placeholder} className={classes} />
      )}
      {description != null && (
        <Text slot="description" className={descriptionStyles}>
          {description}
        </Text>
      )}
      <FieldError className={errorStyles}>{errorMessage}</FieldError>
    </TextField>
  );
}
