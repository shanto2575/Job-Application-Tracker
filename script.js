let interviewList = []
let rejectedList = []
let currentStatus = [];

let total = document.getElementById('TotalCount');
let interviewCount = document.getElementById('interviewCount')
let rejectCount = document.getElementById('rejectedCount')
let availableJobCount = document.getElementById('availableJobCount')

const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')

const allCardSection = document.getElementById('allCards');
const filterSection = document.getElementById('filter-section')


//calculation
function calculateCount() {
    const totalCards = allCardSection.children.length;
    const availableJobs = totalCards - interviewList.length - rejectedList.length;
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectCount.innerText = rejectedList.length;
    availableJobCount.innerText =availableJobs;
}
calculateCount()

//toggleStyle
function toggleStyle(id) {
    allFilterBtn.classList.remove('bg-black', 'text-white');
    interviewFilterBtn.classList.remove('bg-black', 'text-white');
    rejectedFilterBtn.classList.remove('bg-black', 'text-white');

    allFilterBtn.classList.add('bg-gray-200', 'text-black');
    interviewFilterBtn.classList.add('bg-gray-200', 'text-black');
    rejectedFilterBtn.classList.add('bg-gray-200', 'text-black');

    const selected = document.getElementById(id)
    currentStatus = id;
    selected.classList.remove('bg-gray-200', 'text-black')
    selected.classList.add('bg-black', 'text-white')

    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        renderInterviewList()
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden')
        filterSection.classList.add('hidden')
    } else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        renderRejectedList()
    }
}


document.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('delete-btn')) {
        const card = target.parentElement.parentElement;
        const companyName = card.querySelector('.company-name').innerText;

        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);
        card.remove();
        calculateCount();
        return;
    }


    if (target.classList.contains('interview-btn')) {
        const card = target.parentElement.parentElement.parentElement;
        handleStatusUpdate(card, 'Interview');
        return;
    }

    if (target.classList.contains('rejected-btn')) {
        const card = target.parentElement.parentElement.parentElement;
        handleStatusUpdate(card, 'Rejected');
        return;
    }
});

function handleStatusUpdate(card, status) {
    const companyName = card.querySelector('.company-name').innerText;
    if (!companyName) return;

    const position = card.querySelector('.position').innerText;
    const location = card.querySelector('.location').innerText;
    const type = card.querySelector('.type').innerText;
    const salary = card.querySelector('.salary').innerText;
    const notes = card.querySelector('.notes').innerText;

    const cardInfo = { companyName, position, location, type, salary, status, notes };

    const statusEl = card.querySelector('.statuss');
    if (statusEl) {
        statusEl.innerHTML = `<span class="bg-${status === 'Interview' ? 'green' : 'red'}-500 text-white px-3 py-2 rounded text-sm font-medium">${status}</span>`;
    }

    if (status === 'Interview') {
        if (!interviewList.find(item => item.companyName === companyName)) {
            interviewList.push(cardInfo);
        }

        rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        if (currentStatus === 'rejected-filter-btn')
            renderRejectedList();
    } else {
        if (!rejectedList.find(item => item.companyName === companyName)) {
            rejectedList.push(cardInfo);
        }
        interviewList = interviewList.filter(item => item.companyName !== companyName);
        if (currentStatus === 'interview-filter-btn')
            renderInterviewList();
    }

    calculateCount();
}

//rendering
function renderInterviewList() {
    filterSection.innerHTML = '';
    if (interviewList.length === 0) {
        filterSection.innerHTML = `
            <div class="text-center py-20 text-gray-400 border border-gray-300 rounded-3xl shadow-lg">
                <i class="fa-regular fa-file  text-6xl"></i>
                <h3 class="text-2xl font-bold mb-2 text-gray-500">No Interviews Jobs 😭</h3>
                <p class="text-lg">click Interview button then show interview job list</p>
            </div>
        `;
        return;
    }
    for (let interview of interviewList) {
        const div = document.createElement('div');
        div.className = 'bg-black/50 text-white shadow rounded-xl p-6 flex justify-between items-start mb-10';
        div.innerHTML = `
            <div class="space-y-4">
                <h2 class="company-name text-xl font-bold mb-2">${interview.companyName}</h2>
                <p class="position">${interview.position}</p>
                <div class="flex gap-7">
                    <p class="location">${interview.location}</p>
                    <div class="flex gap-7">
                        <p class="type">${interview.type}</p>
                        <p class="salary">${interview.salary}</p>
                    </div>
                </div>
                <div class="statuss">
                    <span class="bg-green-500 text-white px-3 py-2 rounded text-sm font-medium">Interview</span>
                </div>
                <p class="notes text-gray-400 mt-2">${interview.notes}</p>
                <div class="mt-4 flex gap-3">
                    <button class="interview-btn btn btn-success">Interview</button>
                    <button class="rejected-btn btn btn-error">Rejected</button>
                </div>
            </div>
            <div>
                <i class="delete-btn fa-solid fa-trash text-red-500 text-xl cursor-pointer hover:text-red-700"></i>
            </div>
        `;
        filterSection.appendChild(div);
    }
}

function renderRejectedList() {
    filterSection.innerHTML = '';
    if (rejectedList.length === 0) {
        filterSection.innerHTML = `
            <div class="text-center py-20 text-gray-400 border border-gray-300 rounded-3xl shadow-lg">
                <i class="fa-regular fa-file text-6xl"></i>
                <h3 class="text-2xl font-bold mb-2 text-gray-500">No Rejected Jobs 😭</h3>
                <p class="text-lg">click Rejected button then show Rejected job list</p>
            </div>
        `;
        return;
    }
    for (let reject of rejectedList) {
        const div = document.createElement('div');
        div.className = 'bg-black/50 text-white shadow rounded-xl p-6 flex justify-between items-start mb-10';
        div.innerHTML = `
            <div class="space-y-4">
                <h2 class="company-name text-xl font-bold mb-2">${reject.companyName}</h2>
                <p class="position">${reject.position}</p>
                <div class="flex gap-7">
                    <p class="location">${reject.location}</p>
                    <div class="flex gap-7">
                        <p class="type">${reject.type}</p>
                        <p class="salary">${reject.salary}</p>
                    </div>
                </div>
                <div class="statuss">
                    <span class="bg-red-500 text-white px-3 py-2 rounded text-sm font-medium">Rejected</span>
                </div>
                <p class="notes text-gray-400 mt-2">${reject.notes}</p>
                <div class="mt-4 flex gap-3">
                    <button class="interview-btn btn btn-success">Interview</button>
                    <button class="rejected-btn btn btn-error">Rejected</button>
                </div>
            </div>
            <div>
                <i class="delete-btn fa-solid fa-trash text-red-500 text-xl cursor-pointer hover:text-red-700"></i>
            </div>
        `;
        filterSection.appendChild(div);
    }
}
