import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import url, { fileURLToPath } from 'url'

const PORT = 3040;

const students = [
  {
    "sid": 501,
    "name": "Aryan Sharma",
    "class": "V",
    "section": "Lily",
    "gender": "Male",
    "age": 10,
    "p_contact": "9876543210",
    "aadhar": "1234-5678-9101",
    "sport": "Cricket"
  },
  {
    "sid": 502,
    "name": "Sneha Verma",
    "class": "V",
    "section": "Rose",
    "gender": "Female",
    "age": 11,
    "p_contact": "9876543212",
    "aadhar": "2234-5678-9102",
    "sport": "Badminton"
  },
  {
    "sid": 503,
    "name": "Rahul Mehra",
    "class": "V",
    "section": "Tulip",
    "gender": "Male",
    "age": 12,
    "p_contact": "9876543213",
    "aadhar": "3234-5678-9103",
    "sport": "Football"
  },
  {
    "sid": 504,
    "name": "Anjali Singh",
    "class": "V",
    "section": "Jasmine",
    "gender": "Female",
    "age": 10,
    "p_contact": "9876543214",
    "aadhar": "4234-5678-9104",
    "sport": "Basketball"
  },
  {
    "sid": 505,
    "name": "Vikram Rao",
    "class": "V",
    "section": "Lily",
    "gender": "Male",
    "age": 11,
    "p_contact": "9876543215",
    "aadhar": "5234-5678-9105",
    "sport": "Swimming"
  },
  {
    "sid": 506,
    "name": "Pooja Deshmukh",
    "class": "V",
    "section": "Rose",
    "gender": "Female",
    "age": 10,
    "p_contact": "9876543216",
    "aadhar": "6234-5678-9106",
    "sport": "Tennis"
  },
  {
    "sid": 507,
    "name": "Rohit Nair",
    "class": "V",
    "section": "Tulip",
    "gender": "Male",
    "age": 11,
    "p_contact": "9876543217",
    "aadhar": "7234-5678-9107",
    "sport": "Chess"
  },
  {
    "sid": 508,
    "name": "Neha Patil",
    "class": "V",
    "section": "Jasmine",
    "gender": "Female",
    "age": 12,
    "p_contact": "9876543218",
    "aadhar": "8234-5678-9108",
    "sport": "Table Tennis"
  },
  {
    "sid": 509,
    "name": "Karan Joshi",
    "class": "V",
    "section": "Lily",
    "gender": "Male",
    "age": 10,
    "p_contact": "9876543219",
    "aadhar": "9234-5678-9109",
    "sport": "Hockey"
  },
  {
    "sid": 510,
    "name": "Meera Khan",
    "class": "V",
    "section": "Rose",
    "gender": "Female",
    "age": 11,
    "p_contact": "9876543220",
    "aadhar": "1034-5678-9110",
    "sport": "Karate"
  },
  {
    "sid": 511,
    "name": "Kabir Malhotra",
    "class": "V",
    "section": "Lily",
    "gender": "Male",
    "age": 10,
    "p_contact": "9811111111",
    "aadhar": "1111-2222-3333",
    "sport": "Cricket"
  },
  {
    "sid": 512,
    "name": "Riya Banerjee",
    "class": "V",
    "section": "Rose",
    "gender": "Female",
    "age": 11,
    "p_contact": "9822222222",
    "aadhar": "2222-3333-4444",
    "sport": "Badminton"
  },
  {
    "sid": 513,
    "name": "Yash Kapoor",
    "class": "V",
    "section": "Tulip",
    "gender": "Male",
    "age": 12,
    "p_contact": "9833333333",
    "aadhar": "3333-4444-5555",
    "sport": "Football"
  },
  {
    "sid": 514,
    "name": "Anaya Joshi",
    "class": "V",
    "section": "Jasmine",
    "gender": "Female",
    "age": 10,
    "p_contact": "9844444444",
    "aadhar": "4444-5555-6666",
    "sport": "Basketball"
  },
  {
    "sid": 515,
    "name": "Devansh Rathi",
    "class": "V",
    "section": "Lily",
    "gender": "Male",
    "age": 11,
    "p_contact": "9855555555",
    "aadhar": "5555-6666-7777",
    "sport": "Swimming"
  },
  {
    "sid": 516,
    "name": "Ishita Mehra",
    "class": "V",
    "section": "Rose",
    "gender": "Female",
    "age": 10,
    "p_contact": "9866666666",
    "aadhar": "6666-7777-8888",
    "sport": "Tennis"
  },
  {
    "sid": 517,
    "name": "Nikhil Bansal",
    "class": "V",
    "section": "Tulip",
    "gender": "Male",
    "age": 11,
    "p_contact": "9877777777",
    "aadhar": "7777-8888-9999",
    "sport": "Chess"
  },
  {
    "sid": 518,
    "name": "Tanya Reddy",
    "class": "V",
    "section": "Jasmine",
    "gender": "Female",
    "age": 12,
    "p_contact": "9888888888",
    "aadhar": "8888-9999-0000",
    "sport": "Table Tennis"
  },
  {
    "sid": 519,
    "name": "Aarav Sinha",
    "class": "V",
    "section": "Lily",
    "gender": "Male",
    "age": 10,
    "p_contact": "9899999999",
    "aadhar": "9999-0000-1111",
    "sport": "Hockey"
  },
  {
    "sid": 520,
    "name": "Kritika Shah",
    "class": "V",
    "section": "Rose",
    "gender": "Female",
    "age": 11,
    "p_contact": "9800000000",
    "aadhar": "0000-1111-2222",
    "sport": "Karate"
  }
];

const teachers = [
    {
        "tid": "01",
        "name": "Smita Deshmukh",
        "subj": "English",
        "gender": "Female"
    },
    {
        "tid": "02",
        "name": "Mr. Khan",
        "subj": "Maths",
        "gender": "Male"
    },
    {
        "tid": "03",
        "name": "Janvhi Patil",
        "subj": "Social Science",
        "gender": "Female"
    },
    {
        "tid": "04",
        "name": "Prakash Baraskar",
        "subj": "PT",
        "gender": "Male"
    },
    {
        "tid": "05",
        "name": "Sarita Mishra",
        "subj": "Science",
        "gender": "Female"
    }
]

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Content-Type map
const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const getContentType = ext => contentTypes[ext] || 'application/octet-stream';

const server = http.createServer(async (req, res) => {
  const pathname = req.url;

  // API: /api/students
  if (pathname === '/api/students' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(students));
  }

  // API: /api/teachers
  if (pathname === '/api/teachers' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(teachers));
  }

  // Static file serving
  const filepath = pathname === '/'
    ? path.join(__dirname, 'public', 'index.html')
    : path.join(__dirname, 'public', pathname);

  try {
    const ext = path.extname(filepath);
    const contentType = getContentType(ext);
    const fileData = await fs.readFile(filepath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fileData);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Resource Not Found' }));
  }
});


server.listen(PORT , () =>{
    console.log(`Server running on http://localhost:${PORT}`)
});