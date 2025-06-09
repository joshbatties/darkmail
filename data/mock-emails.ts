import type { Email } from "@/types/email"

export const mockEmails: Email[] = [
  {
    id: "1",
    from: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
    },
    to: ["user@example.com"],
    subject: "Project Update - Q1 Results",
    content:
      "Hi there,\n\nI wanted to share the Q1 results with you. We've exceeded our targets by 15% and the client is very happy with our progress.\n\nCan we schedule a meeting tomorrow to discuss the next steps?\n\nBest regards,\nAlex",
    date: "2023-03-15T10:30:00Z",
    read: false,
    starred: true,
    labels: ["work", "important"],
  },
  {
    id: "2",
    from: {
      name: "Sarah Miller",
      email: "sarah.miller@example.com",
    },
    to: ["user@example.com"],
    subject: "Design Review Meeting",
    content:
      "Hello,\n\nJust a reminder that we have a design review meeting scheduled for tomorrow at 2 PM. Please prepare your feedback on the latest mockups.\n\nLooking forward to your insights!\n\nSarah",
    date: "2023-03-14T15:45:00Z",
    read: true,
    starred: false,
    labels: ["work"],
  },
  {
    id: "3",
    from: {
      name: "Michael Chen",
      email: "michael.chen@example.com",
    },
    to: ["user@example.com"],
    subject: "Weekend Plans",
    content:
      "Hey!\n\nA few of us are planning to go hiking this weekend. Would you like to join? We're thinking of Mount Rainier, weather permitting.\n\nLet me know if you're interested and I'll send more details.\n\nCheers,\nMichael",
    date: "2023-03-13T20:15:00Z",
    read: true,
    starred: false,
    labels: ["personal"],
  },
  {
    id: "4",
    from: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
    },
    to: ["user@example.com"],
    subject: "Invoice #1234",
    content:
      "Dear Client,\n\nAttached is the invoice #1234 for the services provided in February 2023.\n\nPlease process the payment at your earliest convenience. If you have any questions, don't hesitate to reach out.\n\nThank you for your business!\n\nEmily Davis\nFinance Department",
    date: "2023-03-12T09:00:00Z",
    read: false,
    starred: false,
    labels: ["finance"],
  },
  {
    id: "5",
    from: {
      name: "David Wilson",
      email: "david.wilson@example.com",
    },
    to: ["user@example.com"],
    subject: "New Product Launch",
    content:
      "Team,\n\nI'm excited to announce that we'll be launching our new product line next month! This is the culmination of months of hard work and dedication.\n\nWe'll be having a company-wide meeting next week to go over the launch strategy. Please come prepared with any questions.\n\nDavid Wilson\nProduct Manager",
    date: "2023-03-11T14:20:00Z",
    read: true,
    starred: true,
    labels: ["work", "important"],
  },
  {
    id: "6",
    from: {
      name: "Jessica Brown",
      email: "jessica.brown@example.com",
    },
    to: ["user@example.com"],
    subject: "Dinner Reservation",
    content:
      "Hi,\n\nI've made a reservation for dinner this Friday at 7 PM at that new Italian restaurant you mentioned. Looking forward to catching up!\n\nJessica",
    date: "2023-03-10T18:30:00Z",
    read: true,
    starred: false,
    labels: ["personal"],
  },
  {
    id: "7",
    from: {
      name: "Robert Taylor",
      email: "robert.taylor@example.com",
    },
    to: ["user@example.com"],
    subject: "Quarterly Budget Review",
    content:
      "Hello,\n\nIt's time for our quarterly budget review. I've attached the spreadsheet with our current expenses and projections for the next quarter.\n\nPlease review it before our meeting on Monday.\n\nRegards,\nRobert\nFinance Director",
    date: "2023-03-09T11:45:00Z",
    read: false,
    starred: false,
    labels: ["work", "finance"],
  },
  {
    id: "8",
    from: {
      name: "Lisa Wang",
      email: "lisa.wang@example.com",
    },
    to: ["user@example.com"],
    subject: "Happy Birthday!",
    content:
      "Happy Birthday!\n\nWishing you a fantastic day filled with joy and celebration. May the coming year bring you success and happiness!\n\nBest wishes,\nLisa",
    date: "2023-03-08T08:00:00Z",
    read: true,
    starred: true,
    labels: ["personal"],
  },
  {
    id: "9",
    from: {
      name: "James Martin",
      email: "james.martin@example.com",
    },
    to: ["user@example.com"],
    subject: "Website Feedback",
    content:
      "Hi there,\n\nI've reviewed the new website and I have some feedback. Overall, it looks great, but I think we could improve the user experience in a few areas.\n\nLet's discuss this in our next meeting.\n\nJames",
    date: "2023-03-07T16:10:00Z",
    read: true,
    starred: false,
    labels: ["work"],
  },
  {
    id: "10",
    from: {
      name: "Sophia Garcia",
      email: "sophia.garcia@example.com",
    },
    to: ["user@example.com"],
    subject: "Vacation Photos",
    content:
      "Hey!\n\nJust got back from my trip to Italy and thought I'd share some photos with you. It was absolutely amazing!\n\nLet's catch up soon so I can tell you all about it.\n\nSophia",
    date: "2023-03-06T21:30:00Z",
    read: false,
    starred: false,
    labels: ["personal"],
  },
]

