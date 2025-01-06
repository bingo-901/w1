async function fetchData() {
    const loading = document.getElementById('loading');
    const dataBody = document.getElementById('dataBody');
    
    try {
        loading.style.display = 'block';
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        dataBody.innerHTML = data.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>`).join('');
    } catch (e) {
        console.error('Fetch error:', e);
    } finally {
        loading.style.display = 'none';
    }
}

fetchData();


