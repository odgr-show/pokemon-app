// import React from 'react'
import "./Card.scss"

export const Card = ({pokemon}) => {
  return (
    <div className='card'>
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className='card__name'>{pokemon.name}</h3>
      <div className='cardTypes'>
        <div>タイプ</div>
        {pokemon.types.map((type) => {
          return (
          <>
            <div>
              <span className='typeName'>{type.type.name}</span>
            </div>
          </>
          );
        })}
      </div>
      <div className="card__info">
        <div className="card__data">
          <p className="title">重さ：{pokemon.weight}</p>
        </div>
        <div className="card__data">
          <p className="title">高さ：{pokemon.height}</p>
        </div>
        <div className="card__data">
          <p className="title">アビリティ：{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  )
}
