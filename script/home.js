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
    manageSpinner(true)
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const details = await res.json();
    allIssues = details.data;
    displayIssues(allIssues);
}
const getPriorityClass = (priority) => {
    if (priority === 'high' || priority === 'bug') return 'badge-error bg-red-100';
    if (priority === 'medium' || priority == 'help wanted') return 'badge-warning bg-amber-100';
    if (priority === 'low' || priority === 'enhancement') return 'badge-sucess bg-green-200';
    else { return 'badge-primary bg-violet-200'; }
}
const statusImg = (status) => {
    if (status === 'open') return './assets/Open-Status.png';
    if (status === 'closed') return './assets/Closed- Status .png';

}
const counter = () => {
    const container = document.getElementById("card-container");
    const counter = document.getElementById("counter");

    const count = container.children.length;
    counter.innerText = count;
}
const toggleBtn = (id) => {
    document.getElementById("all").classList.add('btn-outline')
    document.getElementById("open").classList.add('btn-outline')
    document.getElementById("closed").classList.add('btn-outline')
    document.getElementById(id).classList.remove('btn-outline')
    if (id === 'all') displayIssues(allIssues);
    if (id === 'open') displayIssues(allIssues.filter(issue => issue.status === 'open'));
    if (id === 'closed') displayIssues(allIssues.filter(issue => issue.status === 'closed'));
    counter();

}
const statusBorder=(status)=>{
    if (status === 'open') return 'border-t-8 border-green-600';
    if (status === 'closed') return 'border-t-8 border-violet-600';
}
const displayIssues = (issues) => {
    const container = document.getElementById("card-container");
    container.innerHTML = "";
    issues.forEach(issue => {
        const card = document.createElement("div");
        card.innerHTML = `<div class="min-w-[256px] bg-white p-4 rounded shadow-md gap-4 mx-auto h-full flex flex-col justify-between ${statusBorder(issue.status)}">
                <div class="flex justify-between ">
                    <div><img src="${statusImg(issue.status)}" alt=""></div>
                    <div id="badge" class="badge badge-outline ${getPriorityClass(issue.priority)}">${issue.priority}</div>
                </div>
                <div class='flex flex-col justify-between'>
                    <h2 class="font-semibold text-[16px]">${issue.title}</h2>
                    <p class="text-gray-600 text-[14px]">${issue.description}</p>
                </div>
                <div class="flex flex-wrap gap-2 border-b border-gray-300 pb-2">
                    ${issue.labels.map(label => `<div class="badge badge-outline ${getPriorityClass(label)}">${label.toUpperCase()}</div>`).join("")}
                </div>
                <div>
                    <div id="author text-gray-600 text-[14px]">#${issue.id} by ${issue.author}
                    </div>
                    <div id="date text-gray-600 text-[14px]">
                        ${new Date(issue.createdAt).toLocaleDateString()}
                    </div>
                </div>`;
        container.appendChild(card);
    });
    manageSpinner(false)
    counter();

}
document.getElementById("searchBtn").addEventListener('click', async()=>{
    manageSpinner(true)
    const search = document.getElementById("searchInput").value.trim();
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${search}`;
    const res =await fetch(url);
    const data= await res.json();
    displayIssues(data.data);
    toggleBtn('all');
})

loadIssues();
toggleBtn('all');