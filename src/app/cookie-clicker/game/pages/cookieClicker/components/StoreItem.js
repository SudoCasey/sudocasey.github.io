import React, { useState, useEffect } from "react";
import styles from '@/styles/StoreItem.module.scss';
import Image from 'next/image';


function abbreviateNumber(longNum){
  // Gives an abbreviated format of the number given
  // 1,000 -> 1K
  // 1,000,000 -> 1M
  // 1,000,000,000 -> 1B
  // 1,000,000,000,000 -> 1T (max abbreviation)
  // 1,000,000,000,000,000 -> 1,000T
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 3 // # of values after decimal point
  }).format(longNum);
}

function StoreItem(props){
    let itemCost = props.itemCost;
    let itemName = props.itemName;
    let itemIcon = props.itemIcon;
    let itemsOwned = props.itemsOwned;
    let itemCPS = props.itemCPS;
    let attemptBuy = props.attemptBuy;
    let attemptSell = props.attemptSell;
    

    return (
      <div className={`${styles.storeItem}`}>
        <div className={`${styles.storeIcon}`}>
          <Image src={itemIcon} width="120" height="120" alt={itemName}/>
        </div>
        <div className={`${styles.storeOptions}`}>
          <p>Cost: {`${abbreviateNumber(itemCost*(itemsOwned+1))}`}</p>
          <p>Owned: {`${itemsOwned}`}</p>
          <p>CPS: {`${abbreviateNumber(itemCPS*itemsOwned)}/s`}</p>
          <button onClick={attemptBuy}>{`Buy ${itemName}`}</button>
          <button onClick={attemptSell}>{`Sell ${itemName}`}</button>
        </div>
      </div>
    );
}

export default StoreItem;