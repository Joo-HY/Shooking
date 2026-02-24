import React, { createContext, useContext, useMemo, useState } from "react";

const CardsContext = createContext(null);

const makeId = () => crypto?.randomUUID?.() ?? String(Date.now() + Math.random());
const mockTokenize = () => `tok_${Math.random().toString(36).slice(2)}`;

export function CardsProvider({ children }) {
  const [cards, setCards] = useState([]); 
  const [selectedCardId, setSelectedCardId] = useState(null);

  const addCard = ({ cardNumberRaw, expiryMM, expiryYY, holder }) => {
    const digits = String(cardNumberRaw ?? "").replace(/\D/g, "").slice(0, 16);
    const first8 = digits.slice(0, 8);
    const last4 = digits.slice(12, 16);

    const newCard = {
      id: makeId(),
      token: mockTokenize(),
      first8,
      last4,
      expiryMM,
      expiryYY,
      holder,
      createdAt: Date.now(),
    };

    setCards((prev) => [newCard, ...prev]);
    setSelectedCardId(newCard.id);
    return newCard;
  };

  const removeCard = (id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    setSelectedCardId((prev) => (prev === id ? null : prev));
  };

  const selectCard = (id) => setSelectedCardId(id);

  const selectedCard = useMemo(
    () => cards.find((c) => c.id === selectedCardId) ?? null,
    [cards, selectedCardId]
  );

  const value = useMemo(
    () => ({ cards, selectedCardId, selectedCard, addCard, removeCard, selectCard }),
    [cards, selectedCardId, selectedCard]
  );

  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>;
}

export function useCards() {
  const ctx = useContext(CardsContext);
  if (!ctx) throw new Error("useCards must be used within CardsProvider");
  return ctx;
}