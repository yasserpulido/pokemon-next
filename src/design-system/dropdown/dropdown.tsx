import styled from "@emotion/styled";
import { colors, fontWeight } from "../theme";
import { Alert } from "grommet-icons";
import { ChangeEvent, Ref, forwardRef, useEffect, useState } from "react";

export type Option = {
  id: number;
  name: string;
};

type Props = {
  label: string;
  name: string;
  options: Array<Option>;
  errors?: string;
  value?: number[] | number;
  multiple?: boolean;
  onChange: (value: number[] | number) => void;
};

export const Dropdown = forwardRef(
  (
    {
      label,
      name,
      options,
      value,
      errors = "",
      multiple = false,
      onChange,
    }: Props,
    ref: Ref<HTMLSelectElement>
  ) => {
    const [valueToString, setValueToString] = useState<string[] | string>();
    useEffect(() => {
      if (multiple && value !== undefined && Array.isArray(value)) {
        const result = value.map((option) => option.toString());
        setValueToString(result);
      } else {
        setValueToString(value?.toString());
      }
    }, [value, multiple]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      if (!multiple) {
        onChange(Number(e.currentTarget.value));
        return;
      }

      const values = Array.from(e.currentTarget.selectedOptions, (option) =>
        Number(option.value)
      );
      onChange(values);
    };

    return (
      <div>
        <FormGroup>
          <Label htmlFor={name}>{label}:</Label>
          <Select
            value={valueToString}
            onChange={(e) => handleChange(e)}
            multiple={multiple}
            errors={errors !== ""}
            ref={ref}
          >
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
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

Dropdown.displayName = "Dropdown";

const FormGroup = styled.div({
  marginBottom: "0.2rem",
});

const Label = styled.label({
  display: "block",
  marginBottom: "0.2rem",
  fontSize: "1rem",
});

type SelectProps = {
  errors: boolean;
};

const Select = styled.select<SelectProps>(({ errors }) => ({
  border: `1px solid ${errors ? colors.PersianRed : colors.Black}`,
  borderBottom: `2px solid ${errors ? colors.PersianRed : colors.Black}`,
  borderRadius: 0,
  fontSize: "1rem",
  padding: "0.2rem",
  width: "100%",
  fontWeight: fontWeight.regular,
  color: colors.Black,
  background: colors.White,
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
