
// JavaScript for dynamically adding project and blog cards
const projectsGrid = document.getElementById('project-grid');
const blogsGrid = document.getElementById('blog-grid');

const projectsData = [
    {
        title: 'Covid Safe Visits',
        description: 'Covid Safe Visits is a web tool providing pragmatic pandemic safety tips. It helps plan visits by offering a personal "visit risk" score within 60 seconds, based on 7 weighted risk areas to determine if it\'s safe to visit.'
    },
    {
        title: 'Visitor Management Portal',
        description: 'Led the development of a QR code-based visitor management system for organizations. Oversaw multiple applications, including organization kiosk mobile app, end-user mobile app, and web portal.'
    },
    {
        title: 'Vendor Management',
        description: 'Conducted requirement analysis and implemented CRUD controllers for vendor management. Collaborated with a team of 3 developers for application design and development. Assisted the QA team in seamless application movement across environments.'
    },
    {
        title: 'Breakdown Inc',
        description: 'Designed and developed "Breakdown Inc," a comprehensive truck repair app facilitating easy location of truck and trailer repair shops, heavy-duty truck repair, and towing/wrecker services. Leveraged SaaS methodology for scalability and customization. Integrated AWS services such as EC2, S3, and RDS for high availability and seamless updates.'
    },
    {
        title: 'E-commerce Order Management System',
        description: 'Lead the development of an order management system for an e-commerce company, following the SaaS methodology. Utilized AWS services like Lambda, SQS, and DynamoDB to handle order processing and fulfillment efficiently. Designed the system to support multiple tenants, allowing seamless customization and configuration for individual clients.'
    },
];

const blogsData = [
    { title: 'The Future of Artificial Intelligence', content: 'Exploring the latest advancements and future possibilities in AI.' },
    { title: 'Web Development Trends in 2023', content: 'A comprehensive overview of the upcoming trends in web development.' },
    // Add more blog data as needed
];

function createCard(data) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<h3>${data.title}</h3><p>${data.description || data.content}</p>`;
    return card;
}

function populateGrid(grid, data) {
    data.forEach(item => {
        const card = createCard(item);
        grid.appendChild(card);
    });
}

// Populate project and blog grids with data
populateGrid(projectsGrid, projectsData);
populateGrid(blogsGrid, blogsData);
