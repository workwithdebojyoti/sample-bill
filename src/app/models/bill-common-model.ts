import { BillPreviewComponent } from '../components/bill-preview/bill-preview.component';

export class PartyDetails {
    public partyID: number;
    public partyName: string;
    public gstNumber: string;
    public panNumber: string;
    public address: string;
    public city: string;
    public state: string;
    public zipCode: string;
    public mobileNumber: number;
}

export class Item {
    public itemDetails: string;
    public itemHSNCode: string;
    public itemQuantity: string;
    public itemRate: string;
    public itemTaxPercentage: string;
    public itemTotalTax: number;
    public itemTotal: number;
    public constructor() {
        this.itemDetails = '';
        this.itemHSNCode = '';
        this.itemQuantity = '';
        this.itemRate = '';
        this.itemTaxPercentage = '';
        this.itemTotalTax = 0;
        this.itemTotal = 0;
    }
}

export class PurchaseOrder {
    public orderID: number;
    public orderDate: string;
    public buyerName: string;
    public billerName: string;
    public orderTotal: number;
    public orderSGST: number;
    public orderCGST: number;
    public orderDetails: string;
    public orderGST: number;
    public paymentMode: string;
    public chequeNumber: string;
    public paymentStatus: string;
    public gstRate: number;
    public paymentReferenceNumber: string;
    public paymentID: number;
    /**
     *
     */
    constructor() {
        this.orderID = 0;
        this.paymentMode = 'N/A';
        this.chequeNumber = 'N/A';
    }
}

export class Bill {
    billID: number;
    billerName: string;
    billType: number;
    billTotal: number;
    billTotalTax: number;
    sgst: number;
    cgst: number;
    billDate: Date;
    partyID: number;
    billPaymentStatus: boolean;
    billNumber: string;
    itemList: Array<Item>;
    partyDetails: PartyDetails;
}

export class MonthModel {
    monthName: string;
    monthValue: number;
    /**
     * Constructor
     */
    constructor(name: string, val: number) {
        this.monthName = name;
        this.monthValue = val;
    }
}

export class BillDetails extends Bill {
    paymentID: number;
    fullPaymentRecieved: boolean;
    party: PartyDetails;
    constructor() {
        super();
        this.party = new PartyDetails();
    }
}

export class LabourExpense {
    labourName: string;
    w1Expense: number;
    w2Expense: number;
    w3Expense: number;
    w4Expense: number;
    total: number;
    month: number;
    year: number;
}

export class MonthlyExpense {
    month: string;
    year: number;
    labourExpense: number;
    rentExpense: number;
    electricityExpense: number;
    otherExpense: number;
    totalExpense: number;
    organisation: string;
    monthNumber: number;
}

export class PaymentDetails {
    paymentID: number;
    paymentAmount: number;
    paymentMode: string;
    paymentReferenceNumber;
    paymentDate: Date;
}

export class PaymentInfo {
    paymentID: number;
    transactionType: string;
    transactionTotal: number;
    billID: number;
}

export enum TransactionType {
    Sell = 'sell',
    Purchase = 'purchase'
}

export enum Organisation {
    PB = 'Paul Box',
    PO = 'Paul Offset'
}

export class MonthlySummary {
    monthlyTotalSell: number;
    totalGSTPaid: number;
    monthlyTotalPurchase: number;
    totalGSTReceived: number;
    expense: number;
    organisation: string;
}

export class EmployeeDetails {
    employeeID: string;
    name: string;
    organisation: string;
    mobileNumber: string;
}

export enum Tabs {
    BillTab = 'Bill',
    BillPreviewTab = 'Bill-Preview',
    PurchaseTab = 'Purchase Order',
    PurchaseSummaryTab = 'Purchase Order Summary',
    ExpenseTab = 'Expense',
    DashboardTab = 'Dashboard'
}

export enum FileType {
    Exel = '.xlsx',
    Pdf = '.pdf'
}

export enum PaymentMode {
    
}
