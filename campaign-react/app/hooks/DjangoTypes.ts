/*
* API response Types
* 
* The types for all of the different Tables.  Allows them to be quickly called from anywhere rather than being in disparate different files
*/

export type CampaignCoreType = {
    id: number;
    campaign_name: string;
    description: string | null;
    public: boolean;
}

export type UserRolesType = {
    campaign: number | null;
    user: number;
    role: string;
}

export type PartyMemberType = {
    id: number;
    character_name: string;
    player: number | null;
    class_name: string;
    species: string;
    notes: string;
    active: boolean;
    join_date: Date;
    leave_date: Date | null;
    campaign: number;
}

export type ReceivablesType = {
    id: number;
    irl_date: Date;
    ig_date: string;
    description: string | null;
    pp: number;
    gp: number;
    sp: number;
    cp: number;
    party_trans: boolean;
    payer: number | null;
    campaign: number;
}

export type PayablesType = {
    id: number;
    irl_date: Date;
    ig_date: string;
    description: string | null;
    pp: number;
    gp: number;
    sp: number;
    cp: number;
    party_trans: boolean;
    payee: string;
    payer: number | null;
    campaign: number;
}

export type VehiclesType = {
    id: number;
    name: string;
    type: string;
    size: string;
    equipment: string;
    campaign: number;
}

export type HirelingsType = {
    id: number;
    name: string;
    race: string;
    stats: string;
    vehicle: number | null;
    equipment: string | null;
    campaign: number;
}

export type MagicItemsType = {
    id: number;
    irl_date: Date;
    ig_date: string;
    name: string;
    notes: string;
    rarity: string;
    status: string;
    creator: string;
    link: string;
    powner: number | null;
    vowner: number | null;
    howner: number | null;
    campaign: number;
}

export type ConsumableItemsType = {
    id: number;
    name: string;
    notes: string;
    type: string;
    amount: number;
    link: string;
    campaign: number;
}

export type CalendarCoresType = {
    id: number;
    name: string;
    current_day: number;
    current_month: number;
    current_year: number;
    current_era: string;
    campaign: number;
}

export type CalendarMonthType = {
    id: number;
    name: string;
    order_num: number;
    day_count: number;
    calendar: number;
    campaign: number;
}

export type CalendarEventType = {
    id: number;
    name: string;
    calendar: string;
    campaign: number;
    month: number | null;
    day: number;
    year: number;
    description: string;
}