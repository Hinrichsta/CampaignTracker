export type CampaignCoreType = {
    id: number;
    campaign_name: string;
    description: string;
    public: boolean;
}

export type UserRolesType = {
    campaign: number;
    user: number;
    role: string;
}

export type PartyMemberType = {
    id: number;
    character_name: string;
    player: number;
    class_name: string;
    species: string;
    notes: string;
    active: boolean;
    join_date: Date;
    leave_date: Date;
    campaign: number;
}

export type ReceivablesType = {
    irl_date: Date;
    ig_date: string;
    description: string;
    pp: number;
    gp: number;
    sp: number;
    cp: number;
    party_trans: boolean;
    payer: number;
    campaign: number;
}

export type PayablesType = {
    irl_date: Date;
    ig_date: string;
    description: string;
    pp: number;
    gp: number;
    sp: number;
    cp: number;
    party_trans: boolean;
    payee: string;
    payer: number;
    campaign: number;
}

export type VehiclesType = {
    name: string;
    type: string;
    size: string;
    equipment: string;
    campaign: number;
}

export type HirelingsType = {
    name: string;
    race: string;
    stats: string;
    vehicle: number;
    equipment: string;
    campaign: number;
}

export type MagicItemsType = {
    irl_date: Date;
    ig_date: string;
    name: string;
    notes: string;
    rarity: string;
    status: string;
    creator: string;
    link: string;
    powner: number;
    vowner: number;
    howner: number;
    campaign: number;
}

export type ConsumableItemsType = {
    name: string;
    notes: string;
    type: string;
    amount: number;
    link: string;
    campaign: number;
}

export type CalendarCoresType = {
    name: string;
    current_day: number;
    current_month: number;
    current_year: number;
    current_era: string;
    campaign: number;
}

export type CalendarMonthType = {
    name: string;
    order_num: number;
    day_count: number;
    calendar: number;
    campaign: number;
}

export type CalendarEventType = {
    name: string;
    calendar: string;
    campaign: number;
    month: number;
    day: number;
    year: number;
    description: string;
}