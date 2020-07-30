import { API } from '../Api'

const cartOrder = (order: any) => {
    const local: any = localStorage.getItem("jwt");
    const user: any = JSON.parse(local);
    return fetch(`${API}/order/create/${user.user._id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export default cartOrder;