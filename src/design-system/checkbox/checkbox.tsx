import React, { useMemo } from "react";

import styled from "@emotion/styled";

type Props = {
  label: string;
  name: string;
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
};

export const Checkbox = ({
  label,
  name,
  value,
  disabled = false,
  onChange,
  ...props
}: Props) => {
  const checked = useMemo(() => value, [value]);

  return (
    <Container>
      <input
        id={name}
        name={name}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={(e) => onChange(e.currentTarget.checked)}
        {...props}
      />
      <label htmlFor={name}>{label}</label>
    </Container>
  );
};

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
