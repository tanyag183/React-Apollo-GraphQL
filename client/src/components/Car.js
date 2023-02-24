import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { GETCARS } from '../graphQL/queries';
import { InputField } from './InputField';
import { DELETECAR, UPDATECAR } from '../graphQL/mutations';


export const CarCard = ({ car, peopleData = [] }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const [carValues, setCarValues] = useState({
    model: car.model,
    make: car.make,
    year: car.year,
    price: car.price,
    personId: car.personId,
  });

  const [deleteCar] = useMutation(DELETECAR, {
    variables: { id: car.id },
    refetchQueries: [{ query: GETCARS, variables: { id: car.id } }],
  });

  const [updateCar] = useMutation(UPDATECAR, {
    variables: {
      id: car.id,
      model: carValues.model,
      make: carValues.make,
      year: carValues.year,
      price: carValues.price,
      personId: carValues.personId,
    },
    refetchQueries: [{ query: GETCARS, variables: { id: car.id } }],
  });


  const onSubmit = (e) => {
    e.preventDefault();
    updateCar();
    setIsUpdating(false);
  };


  const handleCarChange = (e) => {
    setCarValues({ ...carValues, [e.target.name]: e.target.value });
  };

  const selectOptions = peopleData &&
    peopleData.map((p) => ({
      ...p,
      label: p.firstName + ' ' + p.lastName,
      value: p.id,
    }));


  if (isUpdating) {
    return (
      <div className='p-2'>
        <form onSubmit={onSubmit} className='gap-3 mt-4' style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'center'}}>
          <InputField
            label={'Model'}
            name={'model'}
            value={carValues.model}
            handleChange={handleCarChange}
          />
          <InputField
            label={'Make'}
            name={'make'}
            value={carValues.make}
            handleChange={handleCarChange}
          />
          <InputField
            label={'Year'}
            type='number'
            name={'year'}
            value={carValues.year}
            handleChange={handleCarChange}
          />
          <InputField
            label={'Price'}
            name={'price'}
            type='number'
            value={carValues.price}
            handleChange={handleCarChange}
          />

          <div>
            <label className='self-center' style={{marginRight: '5px'}}>Person</label>
            <select
              className='border border-gray-200 border-solid rounded-l px-2 py-1'
              name='personId'
              onChange={handleCarChange}
              value={carValues.personId}
            >

              <option> Select Person </option>
              {selectOptions.map((o) => {
                return (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className='grid grid-cols-2'>
            <button style={{ border: '1px solid lightgray', margin: '5px', backgroundColor:'lightgray' }} type='submit'>
              SAVE
            </button>

            <button
              style={{ border: '1px solid lightgray', margin: '5px', backgroundColor: 'lightgray', }}
              onClick={() => setIsUpdating(false)}
            >
              CANCEL
            </button>

          </div>
        </form>
      </div>
    );
  }
  return (
    <div className='border' style={{margin:'10px'}}>
      <p style={{backgroundColor: 'whitesmoke',  padding:'10px'}}>{car.year} {car.make}  {car.model} - $ {car.price}</p>
      
      <div className='grid grid-cols-2' style={{marginTop:'30px'}}>
        <button
          style={{ border: '1px solid lightgray',  backgroundColor: '#fff', paddingTop:'5px', paddingBottom:'5px'}}
          onClick={() => {
            setIsUpdating(true);
          }}
        >
          Edit
        </button>

        <button style={{ border: '1px solid lightgray', backgroundColor: '#fff', color: 'red' }} onClick={deleteCar}>
          Delete
        </button>

      </div>
    </div>
  );
};
