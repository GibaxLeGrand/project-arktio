async function register(name: string, email: string, password: string, confirm_password: string) {
    if (password !== confirm_password) {
        alert("Passwords doesn't match.")
        return;
    }

    const res = await fetch("/api/session/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
            confirm_password: confirm_password,
            name: name
        })
    })

    if (res.status == 200) {
        const data = await res.json();
        if (data.registered) {
            alert(data.message)
            await connect(email, password)
        } else {
            alert(data.error);
        }
    }
}

async function connect(email, mdp) {
    if (email == null || mdp == null) {
        return;
    }

    const res = await fetch("/api/session/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: mdp
        })
    })


    if (res.status == 200) {
        const data = await res.json()
        if (data.connected) {
            window.location.href = "/";
        } else {
            alert("Identifiants incorrects");
        }
    } else {
        alert("Erreur de connexion");
    }
}


export {register, connect}