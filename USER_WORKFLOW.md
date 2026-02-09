# Smart Health Vault - User Workflow

## Overview
Smart Health Vault is a comprehensive health management platform that enables users to securely store, manage, and share their medical information with emergency contacts.

---

## User Journey Map

### Phase 1: Onboarding & Authentication

#### 1.1 Initial Landing
- **User Action**: Visits the application landing page (`/`)
- **What They See**: Welcome page with overview of Smart Health Vault features
- **Options**: 
  - Create new account (Register)
  - Login with existing account

#### 1.2 User Registration
- **Route**: `/register`
- **User Inputs**:
  - Email
  - Password
  - Full name
  - Profile information
- **Backend Process**: 
  - Validates user data
  - Creates user account in database
  - Sets up authentication token
- **Next Step**: Redirect to Dashboard after successful registration

#### 1.3 User Login
- **Route**: `/login`
- **User Inputs**:
  - Email
  - Password
- **Backend Process**:
  - Authenticates credentials via Firebase/Auth system
  - Issues authentication token
  - Validates user session
- **Next Step**: Redirect to Dashboard

---

### Phase 2: Dashboard & Main Navigation
- **Route**: `/dashboard` (Protected - requires authentication)
- **Components**: Navbar + Dashboard content
- **Features Overview**:
  - Quick stats and health summary
  - Navigation hub to all features
  - Recently accessed records

---

### Phase 3: Core Features & User Actions

#### 3.1 Medical Records Management
- **Route**: `/records`
- **User Workflows**:
  
  **Create/Upload New Record:**
  - Click "Add Medical Record"
  - Select record type (prescription, test result, diagnosis, etc.)
  - Upload document/file or enter data manually
  - Add metadata (date, doctor name, notes)
  - Save record
  
  **View Records:**
  - Browse all stored medical records
  - Filter by date, type, or doctor
  - View record details
  - Download/export records
  
  **Manage Records:**
  - Edit existing records
  - Delete outdated records
  - Organize in categories
  - Add tags for easy search

#### 3.2 Emergency Profile Setup
- **Route**: `/emergency`
- **User Workflows**:
  
  **Create Emergency Profile:**
  - Add emergency contact information
  - Include critical health information (allergies, blood type, conditions)
  - Add emergency contacts with their details
  - Set visibility preferences for emergency contacts
  - Generate QR code for quick access
  
  **Share Emergency Information:**
  - Generate shareable link via unique hash
  - QR code for contactless sharing
  - Emergency responders can view via: `/emergency/:hash`
  - Public view shows critical health info without authentication

#### 3.3 Privacy & Visibility Controls
- **Route**: `/privacy`
- **User Workflows**:
  
  **Manage Access Levels:**
  - Define what data each emergency contact can see
  - Set granular permissions (view-only, limited access, full access)
  - Specific medical record permissions
  - Emergency contact visibility rules
  
  **Control Sharing:**
  - Enable/disable emergency contact access
  - Revoke access to specific records
  - Set expiration dates for temporary access
  - Audit trail of who accessed what and when

#### 3.4 Health Reminders
- **Route**: `/reminders`
- **User Workflows**:
  
  **Create Reminders:**
  - Set medication reminders
  - Schedule appointment reminders
  - Add health checkup reminders
  - Set frequency (once, daily, weekly, monthly)
  - Configure notification preferences
  
  **Manage Reminders:**
  - View all active reminders
  - Edit reminder details
  - Mark as complete
  - Delete reminders
  - View reminder history

#### 3.5 AI Chat Assistant
- **Route**: `/chat`
- **User Workflows**:
  
  **Get Health Insights:**
  - Ask questions about health conditions
  - Get medication information
  - Receive wellness tips
  - Get appointment scheduling help
  - Receive general health guidance
  
  **Features:**
  - Context-aware responses based on user's medical history
  - Natural language processing
  - Real-time chat interface
  - Conversation history

#### 3.6 User Profile Management
- **Route**: `/profile`
- **User Workflows**:
  
  **Edit Profile Information:**
  - Update personal details (name, DOB, contact info)
  - Update emergency contacts
  - Manage address information
  - Update insurance details
  
  **Account Settings:**
  - Change password
  - Manage notification preferences
  - Configure language and timezone
  - Delete account (if available)

---

### Phase 4: Data Sharing & Emergency Scenarios

#### 4.1 Emergency Contact Workflow
- **When**: Emergency situation occurs
- **Process**:
  - First responder receives emergency contact info
  - Scans QR code or uses emergency link
  - Views `/emergency/:hash` public page
  - Can see:
    - Critical health conditions
    - Allergies
    - Emergency contacts
    - Blood type
    - Current medications
  - No authentication required
  - Quick access to life-saving information

#### 4.2 Authorized Access by Emergency Contacts
- **When**: Emergency contact needs to view full health records
- **Process**:
  - Emergency contact receives access link from user
  - Logs in with their own credentials (if applicable)
  - Accesses their permitted medical records
  - Views shared emergency profile
  - Cannot access restricted information

---

## Feature Matrix

| Feature | Access | Purpose |
|---------|--------|---------|
| **Medical Records** | Authenticated User | Store and manage health documents |
| **Emergency Profile** | Authenticated User (Create), Public (View) | Quick access to critical health info |
| **Privacy Controls** | Authenticated User | Manage data sharing permissions |
| **Reminders** | Authenticated User | Track medications and appointments |
| **Chat Assistant** | Authenticated User | AI-powered health guidance |
| **User Profile** | Authenticated User | Manage account information |
| **Emergency View** | Public (via hash/QR) | Display critical info without login |

---

## User Roles & Permissions

### Primary User (Account Owner)
- Full access to all features
- Create and manage emergency profiles
- Set privacy controls and visibility rules
- Manage all medical records
- Configure reminders
- Use chat assistant

### Emergency Contact
- View shared emergency profile (if permitted)
- Access specific medical records (based on permissions)
- Cannot modify any data
- Cannot access unrestricted information

### Public/First Responder
- View emergency profile via hash/QR code
- See only critical health information
- No authentication required
- No access to full medical history

---

## Data Flow Summary

```
User Registration/Login
    ↓
Dashboard (Main Hub)
    ↓
    ├─→ Medical Records (CRUD operations)
    ├─→ Emergency Profile (Create, Share, View)
    ├─→ Privacy Controls (Set permissions)
    ├─→ Reminders (Create, Manage)
    ├─→ Chat Assistant (Query, Get insights)
    └─→ Profile (Edit personal info)
    ↓
Share Emergency Info
    ├─→ Generate QR Code
    ├─→ Create Share Link
    └─→ Set Permissions
    ↓
Emergency Responder Access
    └─→ View Public Emergency Profile (No login needed)
```

---

## Key User Interactions Timeline

### First-Time User
1. Land on homepage
2. Register account
3. Set up profile information
4. Create emergency profile
5. Upload first medical record
6. Configure privacy settings
7. Create health reminders
8. Explore chat assistant

### Regular User (Daily/Weekly)
1. Log in to dashboard
2. Check reminders
3. View upcoming appointments
4. Review recent medical records
5. Chat with assistant for health questions
6. Update profile if needed

### Emergency Scenario
1. Emergency responder scans QR code
2. Views critical health information
3. Contacts emergency contact
4. Emergency contact logs in
5. Accesses full permitted records
6. Provides information to medical team

---

## User Goals Fulfilled

✓ **Centralized Health Management**: All medical records in one secure location
✓ **Emergency Preparedness**: Quick access to critical health info for first responders
✓ **Privacy Control**: Granular control over who sees what information
✓ **Medication Management**: Reminders for medications and appointments
✓ **Health Insights**: AI-powered chat for health guidance
✓ **Safe Sharing**: Controlled access for trusted emergency contacts
✓ **Data Organization**: Easy categorization and search of records
✓ **Compliance**: Secure storage of sensitive health information
