import React, { useRef, useEffect, useState } from 'react';
import pt from 'date-fns/locale/pt';

import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { DatePicker } from './styles';

export default function DateInput({ name, placeholderText }) {
  const ref = useRef(null);
  const { fieldName, registerField, error, defaultValue } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <DatePicker
        placeholderText={placeholderText}
        locale={pt}
        timeIntervals={60}
        timeCaption="Hora"
        dateCaption="Data"
        timeFormat="HH:mm"
        dateFormat="dd/MM/yyyy HH:mm"
        name={fieldName}
        showTimeSelect
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DateInput.propTypes = {
  name: PropTypes.string,
  placeholderText: PropTypes.string,
};

DateInput.defaultProps = {
  name: '',
  placeholderText: 'Digite a data',
};
