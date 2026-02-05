import React, { useState, useEffect } from "react";
import StoreItem from "./StoreItem.js";
import styles from "@/styles/Store.module.scss";

function Store(props) {
    let cookies = props.cookies;
    let changeCookies = props.changeCookies;
    let updateCPSFromStore = props.updateCPSFromStore;
    let storeItems = props.storeItems || {
        bakersOwned: 0,
        restaurantsOwned: 0,
        bakingClubsOwned: 0,
        girlScoutsOwned: 0,
        factoriesOwned: 0,
        companiesOwned: 0
    };
    let updateStoreItems = props.updateStoreItems;
    
    const bakerBaseCost = 100;
    const bakerCPS = 10;
    const restaurantBaseCost = bakerBaseCost*25;
    const restaurantCPS = 100;
    const bakingClubBaseCost = restaurantBaseCost*25;
    const bakingClubCPS = 1000;
    const girlScoutBaseCost = bakingClubBaseCost*25;
    const girlScoutCPS = 10000;
    const factoryBaseCost = girlScoutBaseCost*25;
    const factoryCPS = 100000;
    const companyCost = factoryBaseCost*25;
    const companyCPS = 1000000;

    const bakersOwned = storeItems.bakersOwned || 0;
    const restaurantsOwned = storeItems.restaurantsOwned || 0;
    const bakingClubsOwned = storeItems.bakingClubsOwned || 0;
    const girlScoutsOwned = storeItems.girlScoutsOwned || 0;
    const factoriesOwned = storeItems.factoriesOwned || 0;
    const companiesOwned = storeItems.companiesOwned || 0;

    useEffect(()=>{
        const totalBakersCPS = bakersOwned * bakerCPS;
        const totalRestaurantCPS = restaurantsOwned * restaurantCPS;
        const totalBakingClubsCPS = bakingClubsOwned * bakingClubCPS;
        const totalGirlScoutsCPS = girlScoutsOwned * girlScoutCPS;
        const totalFactoriesCPS = factoriesOwned * factoryCPS;
        const totalCompaniesCPS = companiesOwned * companyCPS;
        const totalCPS = totalBakersCPS + totalRestaurantCPS + totalBakingClubsCPS + totalGirlScoutsCPS + totalFactoriesCPS + totalCompaniesCPS;
        updateCPSFromStore(totalCPS);
    }, [bakersOwned, restaurantsOwned, bakingClubsOwned, girlScoutsOwned, factoriesOwned, companiesOwned]);

    function attemptBuy(itemName, itemCost, itemsOwned, cookies){
        const currentCost = itemCost*(itemsOwned+1);
        if(cookies>=currentCost){
            /*console.log("Buying: ",itemName);
            console.log("Cookies: ",cookies);
            console.log("Item Cost: ",itemCost*itemsOwned);
            console.log("Items Currently Owned: ",itemsOwned);*/
            buyItem(itemName, itemsOwned, currentCost);

        } else {
            console.warn("Not enough cookies");
        }
    }

    function buyItem(itemName, itemsOwned, currentCost){
        switch(itemName){
            case "Baker":
                updateStoreItems({ bakersOwned: itemsOwned + 1 });
                changeCookies(0-currentCost);
                break;
            case "Restaurant":
                updateStoreItems({ restaurantsOwned: itemsOwned + 1 });
                changeCookies(0-currentCost);
                break;
            case "Local Baking Club":
                updateStoreItems({ bakingClubsOwned: itemsOwned + 1 });
                changeCookies(0-currentCost);
                break;
            case "Regional Girl Scout Troop":
                updateStoreItems({ girlScoutsOwned: itemsOwned + 1 });
                changeCookies(0-currentCost);
                break;
            case "Child-Labor Factory":
                updateStoreItems({ factoriesOwned: itemsOwned + 1 });
                changeCookies(0-currentCost);
                break;
            case "National Bakery Holding Co.":
                updateStoreItems({ companiesOwned: itemsOwned + 1 });
                changeCookies(0-currentCost);
                break;
            default:
                console.warn("unknown item: ", itemName);
                break;
        }
    }

    function attemptSell(itemName, itemCost, itemsOwned, cookies){
        if(itemsOwned>=1){
            const currentCost = itemCost*itemsOwned;
            sellItem(itemName, itemsOwned, currentCost);
        } else {
            console.warn(`No ${itemName}s owned`);
        }
    }



    function sellItem(itemName, itemsOwned, currentCost){
        const refund = currentCost/2;
        switch(itemName){
            case "Baker":
                updateStoreItems({ bakersOwned: itemsOwned - 1 });
                changeCookies(refund);
                break;
            case "Restaurant":
                updateStoreItems({ restaurantsOwned: itemsOwned - 1 });
                changeCookies(refund);
                break;
            case "Local Baking Club":
                updateStoreItems({ bakingClubsOwned: itemsOwned - 1 });
                changeCookies(refund);
                break;
            case "Regional Girl Scout Troop":
                updateStoreItems({ girlScoutsOwned: itemsOwned - 1 });
                changeCookies(refund);
                break;
            case "Child-Labor Factory":
                updateStoreItems({ factoriesOwned: itemsOwned - 1 });
                changeCookies(refund);
                break;
            case "National Bakery Holding Co.":
                updateStoreItems({ companiesOwned: itemsOwned - 1 });
                changeCookies(refund);
                break;
            default:
                console.warn("unknown item: ", itemName);
                break;
        }
    }

    //TODO
    // StoreItem props should probably be objects (baker obj, restaurant obj, etc)
    return (
        <section
            id="storeSection"
            className={`${styles.storeSection}`}
        >
            <h2>Store</h2>
            <StoreItem
                itemName={"Baker"}
                itemCost={bakerBaseCost}
                itemsOwned={bakersOwned}
                itemCPS={bakerCPS}
                itemIcon={"./baker.png"}
                attemptBuy={()=>{attemptBuy("Baker", bakerBaseCost, bakersOwned, cookies)}}
                attemptSell={()=>{attemptSell("Baker", bakerBaseCost, bakersOwned, cookies)}}
            ></StoreItem>
            <StoreItem
                itemName={"Restaurant"}
                itemCost={restaurantBaseCost}
                itemsOwned={restaurantsOwned}
                itemCPS={restaurantCPS}
                itemIcon={"./restaurant.png"}
                attemptBuy={()=>{attemptBuy("Restaurant", restaurantBaseCost, restaurantsOwned, cookies)}}
                attemptSell={()=>{attemptSell("Restaurant", restaurantBaseCost, restaurantsOwned, cookies)}}
            ></StoreItem>
            <StoreItem
                itemName={"Local Baking Club"}
                itemCost={bakingClubBaseCost}
                itemsOwned={bakingClubsOwned}
                itemCPS={bakingClubCPS}
                itemIcon={"./baking_club.png"}
                attemptBuy={()=>{attemptBuy("Local Baking Club", bakingClubBaseCost, bakingClubsOwned, cookies)}}
                attemptSell={()=>{attemptSell("Local Baking Club", bakingClubBaseCost, bakingClubsOwned, cookies)}}
            ></StoreItem>
            <StoreItem
                itemName={"Regional Girl Scout Troop"}
                itemCost={girlScoutBaseCost}
                itemsOwned={girlScoutsOwned}
                itemCPS={girlScoutCPS}
                itemIcon={"./girl_scouts.png"}
                attemptBuy={()=>{attemptBuy("Regional Girl Scout Troop", girlScoutBaseCost, girlScoutsOwned, cookies)}}
                attemptSell={()=>{attemptSell("Regional Girl Scout Troop", girlScoutBaseCost, girlScoutsOwned, cookies)}}
            ></StoreItem>
            <StoreItem
                itemName={"Child-Labor Factory"}
                itemCost={factoryBaseCost}
                itemsOwned={factoriesOwned}
                itemCPS={factoryCPS}
                itemIcon={"./factory.png"}
                attemptBuy={()=>{attemptBuy("Child-Labor Factory", factoryBaseCost, factoriesOwned, cookies)}}
                attemptSell={()=>{attemptSell("Child-Labor Factory", factoryBaseCost, factoriesOwned, cookies)}}
            ></StoreItem>
            <StoreItem
                itemName={"National Bakery Holding Co."}
                itemCost={companyCost}
                itemsOwned={companiesOwned}
                itemCPS={companyCPS}
                itemIcon={"holding_company.png"}
                attemptBuy={()=>{attemptBuy("National Bakery Holding Co.", companyCost, companiesOwned, cookies)}}
                attemptSell={()=>{attemptSell("National Bakery Holding Co.", companyCost, companiesOwned, cookies)}}
            ></StoreItem>

        </section>
    );
}

export default Store;
