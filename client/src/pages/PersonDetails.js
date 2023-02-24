import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import React from 'react';
import { GETPERSONWITHCARS } from '../graphQL/queries';

export const PersonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: personWithCars } = useQuery(GETPERSONWITHCARS, {
    variables: { id },
  });

  if (personWithCars) {
    return (
      <section style={{ border: '1px solid lightgray', margin: '30px', padding: '20px' }}>
        <h2 className='font-bold' style={{textAlign:'center'}}>{`${personWithCars.person.firstName} ${personWithCars.person.lastName}`}</h2>
        {personWithCars.carsByPersonId.map((car) => (
          <div className='gap-3 border p-1' style={{margin:'20px'}} key={car.id}>
            <p style={{ backgroundColor: 'lightgray', padding: '5px' }}>{car.make}</p>
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Price:</strong> $ {car.price}</p>
          </div>
        ))}
        <button
          style={{ border: '1px solid lightgray',  padding: '10px', marginLeft:'20px'}} onClick={() => navigate(-1)} styles='bg-green-400'>
          Back
        </button>
      </section>
    );
  } else {
    return <p>fetching ...</p>;
  }
};