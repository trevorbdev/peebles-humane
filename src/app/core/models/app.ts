export interface App {
    id: string;
    petid: string | undefined;
    event_uuid: string;
    firstname: string;
    lastname: string;
    email: string;
    dln: string;
    birthday: string;
    spousefirst: string;
    spouselast: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    home: string;
    landlord: string;
    hometype: string;
    moving: string;
    residents: string;
    children: string;
    animals: string;
    status: string;
    appdate: string;
    reason: string | null;
}