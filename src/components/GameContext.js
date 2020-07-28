import React from "react";
import items from "../data/data";
export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = React.useState(() => {
    const storageValue = window.localStorage.getItem("numCookies");
    if (storageValue === null) {
      return 1000;
    } else {
      return JSON.parse(storageValue);
    }
  });

  const [purchasedItems, setPurchasedItems] = React.useState(() => {
    const purchasedStorage = window.localStorage.getItem("purchasedItems");
    if (purchasedStorage === null) {
      return { cursor: 0, grandma: 0, farm: 0 };
    } else {
      return JSON.parse(purchasedStorage);
    }
  });

  React.useEffect(() => {
    window.localStorage.setItem("numCookies", JSON.stringify(numCookies));
    window.localStorage.setItem(
      "purchasedItems",
      JSON.stringify(purchasedItems)
    );
  }, [numCookies, purchasedItems]);

  const items = [
    { id: "cursor", name: "Cursor", cost: 10, value: 1 },
    { id: "grandma", name: "Grandma", cost: 100, value: 10 },
    { id: "farm", name: "Farm", cost: 1000, value: 80 },
  ];

  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        calculateCookiesPerSecond,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
