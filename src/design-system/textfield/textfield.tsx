import styled from "@emotion/styled";
import { Alert } from "grommet-icons";
import { colors, fontWeight } from "../theme";
import { Ref, forwardRef } from "react";

type Props = {
  label: string;
  name: string;
  rows?: number;
  value?: string | number;
  errors?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export const Textfield = forwardRef(
  (
    {
      label,
      name,
      value,
      rows = 2,
      errors = "",
      placeholder = "Type here",
      disabled = false,
      onChange,
      ...props
    }: Props,
    ref: Ref<HTMLTextAreaElement>
  ) => {
    return (
      <div>
        <FormGroup>
          <Label htmlFor={name}>{label}:</Label>
          <TextfieldBase
            id={name}
            name={name}
            placeholder={placeholder}
            onChange={(e) => onChange(e.currentTarget.value)}
            value={value}
            disabled={disabled}
            errors={errors !== ""}
            rows={rows >= 2 ? rows : 2}
            ref={ref}
            {...props}
          />
        </FormGroup>
        {errors !== "" && (
          <Error>
            <ErrorIcon>
              <Alert size="small" />
            </ErrorIcon>
            <ErrorMessage>{errors}</ErrorMessage>
          </Error>
        )}
      </div>
    );
  }
);

Textfield.displayName = "Textfield";

const FormGroup = styled.div({
  marginBottom: "0.2rem",
});

const Label = styled.label({
  display: "block",
  marginBottom: "0.2rem",
});

type FormGroupProps = {
  errors: boolean;
};

const TextfieldBase = styled.textarea<FormGroupProps>(({ errors }) => ({
  resize: "none",
  border: `1px solid ${errors ? colors.PersianRed : colors.Black}`,
  borderBottom: `2px solid ${errors ? colors.PersianRed : colors.Black}`,
  borderRadius: 0,
  fontSize: "1rem",
  padding: "0",
  paddingLeft: "0.2rem",
  lineHeight: "1.5rem",
  width: "100%",
  fontWeight: fontWeight.regular,
  fontFamily: "inherit",

  ":focus": {
    outline: `2px solid ${colors.DenimBlue}`,
  },

  "::placeholder": {
    color: colors.FrenchGrey,
    opacity: 1,
    fontSize: "0.8rem",
  },

  ":disabled": {
    border: `1px solid ${colors.FrenchGrey}`,
    borderBottom: `2px solid ${colors.FrenchGrey}`,
    color: colors.FrenchGrey,
  },
}));

const Error = styled.div({
  display: "flex",
  alignItems: "center",
});

const ErrorIcon = styled.div({
  "& svg, path": {
    fontSize: "1rem",
    marginRight: "0.4rem",
    stroke: colors.PersianRed,
  },
});

const ErrorMessage = styled.span({
  color: colors.PersianRed,
  fontSize: "0.8rem",
});
