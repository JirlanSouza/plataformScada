import React, { InputHTMLAttributes, useState } from "react";
import { Switch } from "./styles";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  setValue: boolean,
  getValue: (value: boolean) => void
}

export const TogleSwitch = (props: CheckBoxProps): JSX.Element => {
  function handleChange () {
    props.getValue(!props.setValue)
  }

  return (
    <Switch htmlFor={props.id} className="switch" >
      <input type="checkbox"  onChange={handleChange} {...props} />
      <span className="slider round"></span>
    </Switch>
  );
};