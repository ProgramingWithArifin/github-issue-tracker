let allIssues = [];
const manageSpinner = (status) => {
    if (status === true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("card-container").classList.add("hidden");
    } else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("card-container").classList.remove("hidden");
    }
};
const loadIssues = async () => {
    manageSpinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const details = await res.json();
    allIssues = details.data;
    displayIssues(allIssues);
};
const getPriorityClass = (priority) => {
    if (priority === "high" || priority === "bug")
        return "badge-error bg-red-100";
    if (priority === "medium" || priority == "help wanted")
        return "badge-warning bg-amber-100";
    if (priority === "low" || priority === "enhancement")
        return "badge-sucess bg-green-200";
    else {
        return "badge-primary bg-violet-200";
    }
};
const statusImg = (status) => {
    if (status === "open") return "./assets/Open-Status.png";
    if (status === "closed") return "./assets/Closed- Status .png";
};
const counter = () => {
    const container = document.getElementById("card-container");
    const counter = document.getElementById("counter");

    const count = container.children.length;
    counter.innerText = count;
};
const toggleBtn = (id) => {
    document.getElementById("all").classList.add("btn-outline");
    document.getElementById("open").classList.add("btn-outline");
    document.getElementById("closed").classList.add("btn-outline");
    document.getElementById(id).classList.remove("btn-outline");
    if (id === "all") displayIssues(allIssues);
    if (id === "open")
        displayIssues(allIssues.filter((issue) => issue.status === "open"));
    if (id === "closed")
        displayIssues(allIssues.filter((issue) => issue.status === "closed"));
    counter();
};
const statusBorder = (status) => {
    if (status === "open") return "border-t-8 border-green-600";
    if (status === "closed") return "border-t-8 border-violet-600";
};
const statusBadge = (status) => {
    if (status === "open") return "badge-success";
    if (status === "closed") return "badge-primary";
};
const openModal = (issue) => {
    document.getElementById("my_modal_5").showModal();
    document.getElementById("modal-container").innerHTML = `
                <h2 class="text-2xl font-bold">${issue.title}</h2>
                <div class="badges flex gap-2 flex-wrap items-center">
                    <div class="badge ${statusBadge(issue.status)} text-white font-bold">${issue.status.toUpperCase()}</div>
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                    <div class="text-gray-600">
                        Opened by ${issue.assignee ? issue.assignee.toUpperCase() : 'None'}
                    </div>
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                    <div class="text-gray-600">
                        ${new Date(issue.createdAt).toLocaleDateString()}
                    </div>
                </div>
                    <div class="flex flex-wrap gap-2 pb-2">
                        ${issue.labels.map((label,) => `<div class="badge badge-outline ${getPriorityClass(label)}">${label.toUpperCase()}</div>`,).join("")}
                    </div>
                    <div class="text-gary600">${issue.description}</div>
                    <div>
                        <h3 class="text-gray-600">Priority:</h3>
                        <div class="badge badge-outline ${getPriorityClass(issue.priority)} font-bold">${issue.priority.toUpperCase()}</div>
                    </div>
                    <div class="flex justify-around items-center flex-wrap">
                        <div>
                            <h3 class="text-gray-600">Assignee:</h3>
                            <p class="font-semibold">${issue.assignee ? issue.assignee.toUpperCase() : 'None'}</p>
                        </div>
                        <div>
                            <h3 class="text-gray-600">Author:</h3>
                            <p class="font-semibold">${issue.author.toUpperCase()}</p>
                        </div>
                    </div>
                    
    `;
};
const displayIssues = (issues) => {
    const container = document.getElementById("card-container");
    container.innerHTML = "";
    issues.forEach((issue) => {
        const card = document.createElement("div");
        card.innerHTML = `<div class="min-w-[256px] bg-white p-4 rounded shadow-md gap-4 mx-auto h-full flex flex-col justify-between ${statusBorder(issue.status)}">
        <div class="flex justify-between ">
        <div><img src="${statusImg(issue.status)}" alt=""></div>
        <div id="badge" class="badge badge-outline ${getPriorityClass(issue.priority)}">${issue.priority.toUpperCase()}</div>
        </div>
        <div class='flex flex-col justify-between'>
        <h2 class="font-semibold text-[16px]">${issue.title}</h2>
        <p class="text-gray-600 text-[14px]">${issue.description}</p>
        </div>
        <div class="flex flex-wrap gap-2 border-b border-gray-300 pb-2">
        ${issue.labels.map((label) => `<div class="badge badge-outline ${getPriorityClass(label)}">${label.toUpperCase()}</div>`).join("")}
        </div>
                <div>
                <div id="author text-gray-600 text-[14px]">#${issue.id} by ${issue.author.toUpperCase()}
                </div>
                <div id="date text-gray-600 text-[14px]">
                ${new Date(issue.createdAt).toLocaleDateString()}
                </div>
                </div>`;
        container.appendChild(card);
        card.onclick = () => openModal(issue);
    });
    manageSpinner(false);
    counter();
};
document.getElementById("searchBtn").addEventListener("click", async () => {
    manageSpinner(true);
    const search = document.getElementById("searchInput").value.trim();
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayIssues(data.data);
    toggleBtn("all");
});

loadIssues();
toggleBtn("all");
