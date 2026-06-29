import { forwardRef, SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from "react";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FieldWrapper({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: FieldWrapperProps) {
  return (
    <div className="field">
      <label htmlFor={htmlFor}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {hint && !error && (
        <span className="field-hint" id={`${htmlFor}-hint`}>
          {hint}
        </span>
      )}
      {error && (
        <span className="field-error" role="alert" id={`${htmlFor}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, hint, id, required, ...rest }, ref) => {
    const fieldId = id ?? rest.name ?? label;
    return (
      <FieldWrapper
        label={label}
        htmlFor={fieldId}
        error={error}
        hint={hint}
        required={required}
      >
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          required={required}
          {...rest}
        />
      </FieldWrapper>
    );
  }
);
TextInput.displayName = "TextInput";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, hint, id, required, children, ...rest }, ref) => {
    const fieldId = id ?? rest.name ?? label;
    return (
      <FieldWrapper
        label={label}
        htmlFor={fieldId}
        error={error}
        hint={hint}
        required={required}
      >
        <select
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          required={required}
          {...rest}
        >
          {children}
        </select>
      </FieldWrapper>
    );
  }
);
SelectField.displayName = "SelectField";

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, hint, id, required, ...rest }, ref) => {
    const fieldId = id ?? rest.name ?? label;
    return (
      <FieldWrapper
        label={label}
        htmlFor={fieldId}
        error={error}
        hint={hint}
        required={required}
      >
        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          required={required}
          {...rest}
        />
      </FieldWrapper>
    );
  }
);
TextareaField.displayName = "TextareaField";

type CheckboxFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
  error?: string;
};

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, error, id, ...rest }, ref) => {
    const fieldId = id ?? rest.name ?? "checkbox";
    return (
      <div className="field">
        <label className="checkbox-field" htmlFor={fieldId}>
          <input
            ref={ref}
            id={fieldId}
            type="checkbox"
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            {...rest}
          />
          <span>{label}</span>
        </label>
        {error && (
          <span className="field-error" role="alert" id={`${fieldId}-error`}>
            {error}
          </span>
        )}
      </div>
    );
  }
);
CheckboxField.displayName = "CheckboxField";
