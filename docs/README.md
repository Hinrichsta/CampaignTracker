# User Stories

## User Story 1
As a **party accountant**, I want to **track finances**, so I can **know how much money we have, and who is owed how much.**

### Acceptance Criteria
- Can easily input Income and Payments
- Shows total gold amount
- Shows how much party members are owed, or owe
- See how much hirelings and vehicles are costing
- Have recurring transactions

## User Story 2
As a **player**, I want to **know what equipment we have**, so I can **use or buy equipment that my character needs**.

### Acceptance
- Easily add equipment and consumables
- Can see descriptions of equipment, and what they do
- See who currently has equipment, and take it if unowned
- Can give equipment to other players

# Mis-User Stories

## Mis-User Story 1
As a **Former Player**, I want to **Delete shared information**, So I can **Destroy the tracking of the campaign**.

### Mitigation
- Require authentication to view or make changes.
- Have roles defining what a user can access.
  - Disallow deletion if below a certain role.


## Mis-User Story 1
As a **Bad GameMaster**, I want to **add incorrect information**, So I can **Make the game harder for my players**.

### Mitigation
- Campaigns can only be seen if you have access to it.
- Only send the bare amount of information.
- Require Authentication to see anything.

# Diagrams
## Mockups
### Campagin Home Page 
World date will be editable from anywhere.  Clicking on the items in storage will bring up an edit page to change information, take them out of storage, or give to a different player. 

![Home Page](./Diagrams/Home%20Page.webp "Home Page")

### Campaign Transactions
Will be able to toggle between the Receivable transactions and the Payable transactions.

![Transactions Page](./Diagrams/Transactions%20Page.webp "Transactions Page")

### Magic Items
Will show all Items in seperate Magic Items and Consumable Items Lists.  Items will be clickable for more information.

![Magic Items Page](./Diagrams/Items%20Page.webp "Magic Items Page")

### Vehicles
Will have a simple Card view for each vehicle that shows the basic information of it.

![Vehicles Page](./Diagrams/Vehicle%20Page.webp "Vehicles Page")

### Vehicles
Will have a simple Card view for each Hirelings, and show their basic information.

![Hirelings Page](./Diagrams/Hirelings%20Page.webp "Hirelings Page")

## Architecture

### Level 1
![Level 1 C4 Diagram](./Diagrams/C4%20-%20Level%201.webp "Level 1 C4 Diagram")
### Level 2
![Level 2 C4 Diagram](./Diagrams/C4%20-%20Level%202.webp "Level 2 C4 Diagram")
### Level 3
![Level 3 C4 Diagram](./Diagrams/C4%20-%20Level%203.webp "Level 3 C4 Diagram")