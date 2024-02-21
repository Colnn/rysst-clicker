interface UpgradeItem {
    id: number;
    name: string;
    unlocked: boolean;
    price: number;
    shopItemID: number;
    action: string;
    value: number;
    description: string;
    parent?: number;
}

interface ShopItem {
    id: number;
    name: string;
    description: string;
    amount: number;
    price: number;
    gps: number;
    parent?: number;
}