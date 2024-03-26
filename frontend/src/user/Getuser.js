import axios from "axios";

export default async function Getuser(states) {

    await axios.post(states.hostname + '/api/handleuser/getuser')
        .then(async res => {
            const username = res.data;
            await states.setUser({ data: username });
        })
        .catch(error => {
            if (error.response === 403) {
                states.setUser(null);
            }
        });

}
