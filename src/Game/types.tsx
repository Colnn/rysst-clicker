interface UpgradeItem {
    id: number;
    name: string;
    unlocked: boolean;
    price: number;
    shopItemID: number;
    action: string;
    value: number;
    description: string;
}

interface ShopItem {
    id: number;
    name: string;
    amount: number;
    price: number;
    gps: number;
}