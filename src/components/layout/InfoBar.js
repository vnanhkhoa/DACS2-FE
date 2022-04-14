import React, {useState, useContext} from 'react'
import MoneyBag from '../../assets/icon-moneybag.svg'
import Transactions from '../../assets/icon-transaction.svg'
import Calendar from '../../assets/icon-date.svg'
import Form from 'react-bootstrap/Form'
import { BillContext } from '../../contexts/BillContext'

const InfoBar = (bills) => {
    const {
            updateDateBills
        } = useContext(BillContext)
    const [date, setDate] = useState(new Date());
    let total = 0;
    if(bills) {
        let rock = 0;
        bills.bills.map((bill) => {
            rock = rock + bill.total;
        })
        total = rock;
    }
    const setChange = (e) => {
        setDate(e.target.value);
        updateDateBills({date: e.target.value})
    }

    return (
        <div className='Info-Container'>
            <div className="Info-TotalBills">
                <div className="Icon"><img width={70} height={70} src={Transactions} alt="Total Orders" /></div>
                <div className="Text-Container">
                    <h2>Total Orders</h2>
                    <div className="Content">
                        {bills.bills.length}
                    </div>
                </div>
            </div>
            <div className="Info-TotalEarn">
                <div className="Icon"><img width={70} height={70} src={MoneyBag} alt="Earning" /></div>
                <div className="Text-Container">
                    <h2>Earning</h2>
                    <div className="Content">
                        {total} VNĐ
                    </div>
                </div>
            </div>
            <div className='Info-Function'>
                <div className="Icon"><img width={70} height={70} src={Calendar} alt="Calendar" /></div>
                <div className="Date-Container">
                    <Form.Control type="date" name="date-from" value={date} onChange={setChange} />
                </div>
            </div>
        </div>
    )
}

export default InfoBar
