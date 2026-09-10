<template>
  <q-page class="agent-profile-page">

    <!-- =========================================================
         PAGE HEADER
    ========================================================== -->

    <div class="page-header">

      <div>
        <div class="page-title">
          My Profile
        </div>

        <div class="page-subtitle">
          Manage your personal and agency information
        </div>
      </div>

      <q-btn
        color="primary"
        icon="edit"
        label="Edit Profile"
        unelevated
        no-caps
        class="edit-profile-btn"
        @click="openEditDialog"
      />

    </div>


    <!-- =========================================================
         PROFILE MAIN CARD
    ========================================================== -->

    <q-card
      flat
      class="main-profile-card"
    >

      <!-- =====================================================
           PROFILE HERO
      ====================================================== -->

      <div class="profile-hero">

        <div class="hero-content">

          <!-- PROFILE PHOTO -->

          <div class="profile-photo-wrapper">

            <q-avatar
              size="115px"
              class="profile-avatar"
            >

              <img
                :src="profileImage"
                alt="Agent Profile"
              />

            </q-avatar>


            <q-btn
              round
              dense
              unelevated
              color="primary"
              icon="photo_camera"
              class="camera-btn"
              @click="triggerImageUpload"
            >

              <q-tooltip>
                Change profile photo
              </q-tooltip>

            </q-btn>


            <input
              ref="imageInput"
              type="file"
              accept="image/*"
              hidden
              @change="handleImageUpload"
            />

          </div>


          <!-- BASIC INFORMATION -->

          <div class="hero-info">

            <div class="hero-name">
              {{ profile.name || 'Agent Name' }}
            </div>


            <div class="hero-role">

              <q-icon
                name="badge"
                size="18px"
              />

              Agent

            </div>


            <div class="hero-contact">

              <span v-if="profile.email">
                <q-icon name="email" />
                {{ profile.email }}
              </span>

              <span v-if="profile.mobile">
                <q-icon name="phone" />
                {{ profile.mobile }}
              </span>

            </div>


            <q-chip
              color="positive"
              text-color="white"
              icon="check_circle"
              size="sm"
              class="status-chip"
            >
              {{ profile.status || 'Active' }}
            </q-chip>

          </div>

        </div>


        <!-- AGENT ID -->

        <div class="hero-agent-id">

          <div class="hero-id-label">
            AGENT ID
          </div>

          <div class="hero-id-value">
            {{ profile.agentId || '-' }}
          </div>

        </div>

      </div>


      <!-- =====================================================
           PERSONAL INFORMATION
      ====================================================== -->

      <q-card-section class="profile-section">

        <div class="section-header">

          <div class="section-icon blue">
            <q-icon name="person" />
          </div>

          <div>

            <div class="section-title">
              Personal Information
            </div>

            <div class="section-description">
              Your basic personal and identification details
            </div>

          </div>

        </div>


        <div class="info-grid">

          <!-- FULL NAME -->

          <div class="info-box">

            <div class="info-icon">
              <q-icon name="person" />
            </div>

            <div>
              <div class="info-label">
                Full Name
              </div>

              <div class="info-value">
                {{ profile.name || '-' }}
              </div>
            </div>

          </div>


          <!-- EMAIL -->

          <div class="info-box">

            <div class="info-icon">
              <q-icon name="email" />
            </div>

            <div>
              <div class="info-label">
                Email Address
              </div>

              <div class="info-value">
                {{ profile.email || '-' }}
              </div>
            </div>

          </div>


          <!-- MOBILE -->

          <div class="info-box">

            <div class="info-icon">
              <q-icon name="phone" />
            </div>

            <div>
              <div class="info-label">
                Mobile Number
              </div>

              <div class="info-value">
                {{ profile.mobile || '-' }}
              </div>
            </div>

          </div>


          <!-- GENDER -->

          <div class="info-box">

            <div class="info-icon">
              <q-icon name="wc" />
            </div>

            <div>
              <div class="info-label">
                Gender
              </div>

              <div class="info-value">
                {{ profile.gender || '-' }}
              </div>
            </div>

          </div>


          <!-- DOB -->

          <div class="info-box">

            <div class="info-icon">
              <q-icon name="calendar_month" />
            </div>

            <div>
              <div class="info-label">
                Date of Birth
              </div>

              <div class="info-value">
                {{ profile.dateOfBirth || '-' }}
              </div>
            </div>

          </div>


          <!-- AADHAR -->

          <div class="info-box">

            <div class="info-icon">
              <q-icon name="badge" />
            </div>

            <div>
              <div class="info-label">
                Aadhar Card Number
              </div>

              <div class="info-value">
                {{ profile.aadharNumber || '-' }}
              </div>
            </div>

          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- =====================================================
           ADDRESS INFORMATION
      ====================================================== -->

      <q-card-section class="profile-section">

        <div class="section-header">

          <div class="section-icon orange">
            <q-icon name="location_on" />
          </div>

          <div>

            <div class="section-title">
              Address Information
            </div>

            <div class="section-description">
              Your residential address details
            </div>

          </div>

        </div>


        <div class="info-grid">

          <!-- ADDRESS -->

          <div class="info-box full-width">

            <div class="info-icon orange-bg">
              <q-icon name="home" />
            </div>

            <div>
              <div class="info-label">
                Address
              </div>

              <div class="info-value">
                {{ profile.address || '-' }}
              </div>
            </div>

          </div>


          <!-- STATE -->

          <div class="info-box">

            <div class="info-icon orange-bg">
              <q-icon name="map" />
            </div>

            <div>
              <div class="info-label">
                State
              </div>

              <div class="info-value">
                {{ profile.state || '-' }}
              </div>
            </div>

          </div>


          <!-- CITY -->

          <div class="info-box">

            <div class="info-icon orange-bg">
              <q-icon name="location_city" />
            </div>

            <div>
              <div class="info-label">
                City
              </div>

              <div class="info-value">
                {{ profile.city || '-' }}
              </div>
            </div>

          </div>


          <!-- PINCODE -->

          <div class="info-box">

            <div class="info-icon orange-bg">
              <q-icon name="pin_drop" />
            </div>

            <div>
              <div class="info-label">
                Pincode
              </div>

              <div class="info-value">
                {{ profile.pincode || '-' }}
              </div>
            </div>

          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- =====================================================
           AADHAR DOCUMENT
      ====================================================== -->

      <q-card-section class="profile-section">

        <div class="section-header">

          <div class="section-icon purple">
            <q-icon name="description" />
          </div>

          <div>

            <div class="section-title">
              Identity Document
            </div>

            <div class="section-description">
              Aadhar card information and document
            </div>

          </div>

        </div>


        <div class="document-grid">

          <div class="document-card">

            <div class="document-icon">
              <q-icon
                name="badge"
                size="28px"
              />
            </div>

            <div class="document-content">

              <div class="document-label">
                Aadhar Card Number
              </div>

              <div class="document-value">
                {{ profile.aadharNumber || '-' }}
              </div>

            </div>

          </div>


          <div class="document-card">

            <div class="document-icon">
              <q-icon
                name="image"
                size="28px"
              />
            </div>

            <div class="document-content">

              <div class="document-label">
                Aadhar Card Photo
              </div>

              <q-btn
                v-if="profile.aadharPhoto"
                flat
                dense
                color="primary"
                label="View Document"
                icon="visibility"
                no-caps
                @click="openDocument(profile.aadharPhoto)"
              />

              <div
                v-else
                class="document-empty"
              >
                Not uploaded
              </div>

            </div>

          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- =====================================================
           AGENCY INFORMATION
      ====================================================== -->

      <q-card-section class="profile-section">

        <div class="section-header">

          <div class="section-icon green">
            <q-icon name="business" />
          </div>

          <div>

            <div class="section-title">
              Agency Information
            </div>

            <div class="section-description">
              Business and agency information
            </div>

          </div>

        </div>


        <div class="info-grid">

          <!-- AGENCY NAME -->

          <div class="info-box">

            <div class="info-icon green-bg">
              <q-icon name="business" />
            </div>

            <div>
              <div class="info-label">
                Agency Name
              </div>

              <div class="info-value">
                {{ profile.agencyName || '-' }}
              </div>
            </div>

          </div>


          <!-- AGENCY OPENING -->

          <div class="info-box">

            <div class="info-icon green-bg">
              <q-icon name="event" />
            </div>

            <div>
              <div class="info-label">
                Agency Opening
              </div>

              <div class="info-value">
                {{ profile.agencyOpening || '-' }}
              </div>
            </div>

          </div>


          <!-- AGENCY CELL -->

          <div class="info-box">

            <div class="info-icon green-bg">
              <q-icon name="phone" />
            </div>

            <div>
              <div class="info-label">
                Agency Cell Number
              </div>

              <div class="info-value">
                {{ profile.agencyCellNumber || '-' }}
              </div>
            </div>

          </div>


          <!-- AGENCY EMAIL -->

          <div class="info-box">

            <div class="info-icon green-bg">
              <q-icon name="email" />
            </div>

            <div>
              <div class="info-label">
                Agency Email
              </div>

              <div class="info-value">
                {{ profile.agencyEmail || '-' }}
              </div>
            </div>

          </div>


          <!-- AGENCY ADDRESS -->

          <div class="info-box full-width">

            <div class="info-icon green-bg">
              <q-icon name="location_on" />
            </div>

            <div>
              <div class="info-label">
                Agency Address
              </div>

              <div class="info-value">
                {{ profile.agencyAddress || '-' }}
              </div>
            </div>

          </div>


          <!-- LICENSE -->

          <div class="info-box">

            <div class="info-icon green-bg">
              <q-icon name="verified" />
            </div>

            <div>
              <div class="info-label">
                Agency License Number
              </div>

              <div class="info-value">
                {{ profile.agencyLicenseNumber || '-' }}
              </div>
            </div>

          </div>


          <!-- REGISTRATION -->

          <div class="info-box">

            <div class="info-icon green-bg">
              <q-icon name="app_registration" />
            </div>

            <div>
              <div class="info-label">
                Agency Registration Number
              </div>

              <div class="info-value">
                {{ profile.agencyRegistrationNumber || '-' }}
              </div>
            </div>

          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- =====================================================
           GST INFORMATION
      ====================================================== -->

      <q-card-section class="profile-section">

        <div class="section-header">

          <div class="section-icon blue">
            <q-icon name="receipt_long" />
          </div>

          <div>

            <div class="section-title">
              GST Information
            </div>

            <div class="section-description">
              Goods and Services Tax registration details
            </div>

          </div>

        </div>


        <div class="document-grid">

          <div class="document-card">

            <div class="document-icon">
              <q-icon name="receipt_long" />
            </div>

            <div class="document-content">

              <div class="document-label">
                GST Number
              </div>

              <div class="document-value">
                {{ profile.gstNumber || '-' }}
              </div>

            </div>

          </div>


          <div class="document-card">

            <div class="document-icon">
              <q-icon name="event" />
            </div>

            <div class="document-content">

              <div class="document-label">
                GST Expiry Date
              </div>

              <div class="document-value">
                {{ profile.gstExpiryDate || '-' }}
              </div>

            </div>

          </div>


          <div class="document-card">

            <div class="document-icon">
              <q-icon name="description" />
            </div>

            <div class="document-content">

              <div class="document-label">
                GST Certificate
              </div>

              <q-btn
                v-if="profile.gstCertificate"
                flat
                dense
                color="primary"
                label="View Certificate"
                icon="visibility"
                no-caps
                @click="openDocument(profile.gstCertificate)"
              />

              <div
                v-else
                class="document-empty"
              >
                Not uploaded
              </div>

            </div>

          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- =====================================================
           AGENCY DOCUMENTS
      ====================================================== -->

      <q-card-section class="profile-section">

        <div class="section-header">

          <div class="section-icon purple">
            <q-icon name="folder_special" />
          </div>

          <div>

            <div class="section-title">
              Agency Documents
            </div>

            <div class="section-description">
              Certificates, licenses and registration documents
            </div>

          </div>

        </div>


        <div class="document-grid">

          <!-- CERTIFICATE -->

          <div class="document-card">

            <div class="document-icon">
              <q-icon name="workspace_premium" />
            </div>

            <div class="document-content">

              <div class="document-label">
                Agency Certificate
              </div>

              <div class="document-value">
                {{ profile.agencyCertificate ? 'Uploaded' : 'Not uploaded' }}
              </div>

              <div class="document-meta">
                Expiry:
                {{ profile.agencyCertificateExpiryDate || '-' }}
              </div>

            </div>

          </div>


          <!-- LICENSE -->

          <div class="document-card">

            <div class="document-icon">
              <q-icon name="license" />
            </div>

            <div class="document-content">

              <div class="document-label">
                Agency License
              </div>

              <div class="document-value">
                {{ profile.agencyLicenseNumber || '-' }}
              </div>

              <div class="document-meta">
                Expiry:
                {{ profile.agencyLicenseExpiryDate || '-' }}
              </div>

            </div>

          </div>


          <!-- REGISTRATION -->

          <div class="document-card">

            <div class="document-icon">
              <q-icon name="app_registration" />
            </div>

            <div class="document-content">

              <div class="document-label">
                Agency Registration
              </div>

              <div class="document-value">
                {{ profile.agencyRegistrationNumber || '-' }}
              </div>

              <div class="document-meta">
                Expiry:
                {{ profile.agencyRegistrationExpiryDate || '-' }}
              </div>

            </div>

          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- =====================================================
           TAX & COMPLIANCE
      ====================================================== -->

      <q-card-section class="profile-section">

        <div class="section-header">

          <div class="section-icon orange">
            <q-icon name="account_balance" />
          </div>

          <div>

            <div class="section-title">
              Tax & Compliance
            </div>

            <div class="section-description">
              PAN, TAN and FSSAI information
            </div>

          </div>

        </div>


        <div class="info-grid">

          <!-- PAN -->

          <div class="info-box">

            <div class="info-icon orange-bg">
              <q-icon name="credit_card" />
            </div>

            <div>

              <div class="info-label">
                Agency PAN Number
              </div>

              <div class="info-value">
                {{ profile.agencyPanNumber || '-' }}
              </div>

            </div>

          </div>


          <!-- TAN -->

          <div class="info-box">

            <div class="info-icon orange-bg">
              <q-icon name="account_balance" />
            </div>

            <div>

              <div class="info-label">
                Agency TAN Number
              </div>

              <div class="info-value">
                {{ profile.agencyTanNumber || '-' }}
              </div>

            </div>

          </div>


          <!-- FSSAI -->

          <div class="info-box">

            <div class="info-icon orange-bg">
              <q-icon name="restaurant" />
            </div>

            <div>

              <div class="info-label">
                Agency FSSAI Number
              </div>

              <div class="info-value">
                {{ profile.agencyFssaiNumber || '-' }}
              </div>

            </div>

          </div>


          <!-- FSSAI EXPIRY -->

          <div class="info-box">

            <div class="info-icon orange-bg">
              <q-icon name="event" />
            </div>

            <div>

              <div class="info-label">
                FSSAI Expiry Date
              </div>

              <div class="info-value">
                {{ profile.agencyFssaiExpiryDate || '-' }}
              </div>

            </div>

          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- =====================================================
           OTHER DOCUMENT
      ====================================================== -->

      <q-card-section class="profile-section">

        <div class="section-header">

          <div class="section-icon grey">
            <q-icon name="folder" />
          </div>

          <div>

            <div class="section-title">
              Other Document
            </div>

            <div class="section-description">
              Additional agency document information
            </div>

          </div>

        </div>


        <div class="info-box">

          <div class="info-icon">
            <q-icon name="description" />
          </div>

          <div>

            <div class="info-label">
              Agency Other Document Name
            </div>

            <div class="info-value">
              {{ profile.agencyOtherDocumentName || '-' }}
            </div>

          </div>

        </div>

      </q-card-section>


      <q-separator />


      <!-- =====================================================
           ACCOUNT INFORMATION
      ====================================================== -->

      <q-card-section class="profile-section">

        <div class="section-header">

          <div class="section-icon green">
            <q-icon name="manage_accounts" />
          </div>

          <div>

            <div class="section-title">
              Account Information
            </div>

            <div class="section-description">
              Agent account and security information
            </div>

          </div>

        </div>


        <div class="account-grid">

          <div class="account-card">

            <q-icon
              name="verified_user"
              color="positive"
              size="30px"
            />

            <div>

              <div class="account-label">
                Account Status
              </div>

              <div class="account-value text-positive">
                {{ profile.status || 'Active' }}
              </div>

            </div>

          </div>


          <div class="account-card">

            <q-icon
              name="calendar_today"
              color="primary"
              size="30px"
            />

            <div>

              <div class="account-label">
                Joining Date
              </div>

              <div class="account-value">
                {{ profile.joiningDate || '-' }}
              </div>

            </div>

          </div>


          <div class="account-card">

            <q-icon
              name="percent"
              color="orange"
              size="30px"
            />

            <div>

              <div class="account-label">
                Commission
              </div>

              <div class="account-value">
                {{ profile.commission || '0%' }}
              </div>

            </div>

          </div>

        </div>

      </q-card-section>

    </q-card>


    <!-- =========================================================
         EDIT PROFILE DIALOG
    ========================================================== -->

    <q-dialog
      v-model="editDialog"
      persistent
    >

      <q-card class="edit-dialog">

        <!-- DIALOG HEADER -->

        <q-card-section class="dialog-header">

          <div>

            <div class="dialog-title">
              Edit Profile
            </div>

            <div class="dialog-subtitle">
              Update your personal and agency information
            </div>

          </div>

          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
          />

        </q-card-section>


        <q-separator />


        <!-- DIALOG BODY -->

        <q-card-section class="dialog-body">

          <!-- ===================================================
               PERSONAL INFORMATION
          ==================================================== -->

          <div class="form-section-title">

            <q-icon name="person" />

            Personal Information

          </div>


          <div class="row q-col-gutter-md">

            <!-- NAME -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.name"
                outlined
                dense
                label="Full Name *"
                color="primary"
                :rules="[
                  val => !!val || 'Name is required'
                ]"
              >

                <template #prepend>
                  <q-icon name="person" />
                </template>

              </q-input>

            </div>


            <!-- EMAIL -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.email"
                outlined
                dense
                label="Email Address"
                type="email"
              >

                <template #prepend>
                  <q-icon name="email" />
                </template>

              </q-input>

            </div>


            <!-- MOBILE -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.mobile"
                outlined
                dense
                label="Mobile Number"
              >

                <template #prepend>
                  <q-icon name="phone" />
                </template>

              </q-input>

            </div>


            <!-- GENDER -->

            <div class="col-12 col-md-6">

              <q-select
                v-model="editForm.gender"
                :options="genderOptions"
                outlined
                dense
                label="Gender"
                emit-value
                map-options
              >

                <template #prepend>
                  <q-icon name="wc" />
                </template>

              </q-select>

            </div>


            <!-- DOB -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.dateOfBirth"
                outlined
                dense
                type="date"
                label="Date of Birth"
              >

                <template #prepend>
                  <q-icon name="calendar_month" />
                </template>

              </q-input>

            </div>


            <!-- AADHAR -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.aadharNumber"
                outlined
                dense
                maxlength="12"
                label="Aadhar Card Number"
                hint="Enter 12 digit Aadhar number"
              >

                <template #prepend>
                  <q-icon name="badge" />
                </template>

              </q-input>

            </div>


            <!-- STATE -->

            <div class="col-12 col-md-4">

              <q-input
                v-model="editForm.state"
                outlined
                dense
                label="State"
              >

                <template #prepend>
                  <q-icon name="map" />
                </template>

              </q-input>

            </div>


            <!-- CITY -->

            <div class="col-12 col-md-4">

              <q-input
                v-model="editForm.city"
                outlined
                dense
                label="City"
              >

                <template #prepend>
                  <q-icon name="location_city" />
                </template>

              </q-input>

            </div>


            <!-- PINCODE -->

            <div class="col-12 col-md-4">

              <q-input
                v-model="editForm.pincode"
                outlined
                dense
                label="Pincode"
              >

                <template #prepend>
                  <q-icon name="pin_drop" />
                </template>

              </q-input>

            </div>


            <!-- ADDRESS -->

            <div class="col-12">

              <q-input
                v-model="editForm.address"
                outlined
                autogrow
                type="textarea"
                label="Residential Address"
              >

                <template #prepend>
                  <q-icon name="home" />
                </template>

              </q-input>

            </div>


            <!-- AADHAR PHOTO -->

            <div class="col-12">

              <q-file
                v-model="editFiles.aadharPhoto"
                outlined
                dense
                label="Aadhar Card Photo"
                accept="image/*,.pdf"
                clearable
              >

                <template #prepend>
                  <q-icon name="badge" />
                </template>

              </q-file>

            </div>

          </div>


          <!-- ===================================================
               AGENCY INFORMATION
          ==================================================== -->

          <div class="form-section-title q-mt-xl">

            <q-icon name="business" />

            Agency Information

          </div>


          <div class="row q-col-gutter-md">

            <!-- AGENCY NAME -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.agencyName"
                outlined
                dense
                label="Agency Name"
              >

                <template #prepend>
                  <q-icon name="business" />
                </template>

              </q-input>

            </div>


            <!-- OPENING -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.agencyOpening"
                outlined
                dense
                type="date"
                label="Agency Opening"
              >

                <template #prepend>
                  <q-icon name="event" />
                </template>

              </q-input>

            </div>


            <!-- CELL -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.agencyCellNumber"
                outlined
                dense
                label="Agency Cell Number"
              >

                <template #prepend>
                  <q-icon name="phone" />
                </template>

              </q-input>

            </div>


            <!-- EMAIL -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.agencyEmail"
                outlined
                dense
                type="email"
                label="Agency Email"
              >

                <template #prepend>
                  <q-icon name="email" />
                </template>

              </q-input>

            </div>


            <!-- ADDRESS -->

            <div class="col-12">

              <q-input
                v-model="editForm.agencyAddress"
                outlined
                autogrow
                type="textarea"
                label="Agency Address"
              >

                <template #prepend>
                  <q-icon name="location_on" />
                </template>

              </q-input>

            </div>

          </div>


          <!-- ===================================================
               GST
          ==================================================== -->

          <div class="form-section-title q-mt-xl">

            <q-icon name="receipt_long" />

            GST Information

          </div>


          <div class="row q-col-gutter-md">

            <!-- GST NUMBER -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.gstNumber"
                outlined
                dense
                label="GST Number"
              >

                <template #prepend>
                  <q-icon name="receipt_long" />
                </template>

              </q-input>

            </div>


            <!-- GST EXPIRY -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.gstExpiryDate"
                outlined
                dense
                type="date"
                label="GST Expiry Date"
              >

                <template #prepend>
                  <q-icon name="event" />
                </template>

              </q-input>

            </div>


            <!-- GST CERTIFICATE -->

            <div class="col-12">

              <q-file
                v-model="editFiles.gstCertificate"
                outlined
                dense
                label="GST Certificate"
                accept="image/*,.pdf"
                clearable
              >

                <template #prepend>
                  <q-icon name="description" />
                </template>

              </q-file>

            </div>

          </div>


          <!-- ===================================================
               AGENCY CERTIFICATE
          ==================================================== -->

          <div class="form-section-title q-mt-xl">

            <q-icon name="workspace_premium" />

            Agency Certificate

          </div>


          <div class="row q-col-gutter-md">

            <!-- CERTIFICATE -->

            <div class="col-12 col-md-8">

              <q-file
                v-model="editFiles.agencyCertificate"
                outlined
                dense
                label="Agency Certificate"
                accept="image/*,.pdf"
                clearable
              >

                <template #prepend>
                  <q-icon name="workspace_premium" />
                </template>

              </q-file>

            </div>


            <!-- EXPIRY -->

            <div class="col-12 col-md-4">

              <q-input
                v-model="editForm.agencyCertificateExpiryDate"
                outlined
                dense
                type="date"
                label="Expiry Date"
              />

            </div>

          </div>


          <!-- ===================================================
               LICENSE
          ==================================================== -->

          <div class="form-section-title q-mt-xl">

            <q-icon name="verified" />

            Agency License

          </div>


          <div class="row q-col-gutter-md">

            <!-- LICENSE NUMBER -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.agencyLicenseNumber"
                outlined
                dense
                label="Agency License Number"
              >

                <template #prepend>
                  <q-icon name="verified" />
                </template>

              </q-input>

            </div>


            <!-- EXPIRY -->

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.agencyLicenseExpiryDate"
                outlined
                dense
                type="date"
                label="License Expiry Date"
              />

            </div>


            <!-- PHOTO -->

            <div class="col-12">

              <q-file
                v-model="editFiles.agencyLicensePhoto"
                outlined
                dense
                label="Agency License Photo"
                accept="image/*,.pdf"
                clearable
              >

                <template #prepend>
                  <q-icon name="image" />
                </template>

              </q-file>

            </div>

          </div>


          <!-- ===================================================
               PAN
          ==================================================== -->

          <div class="form-section-title q-mt-xl">

            <q-icon name="credit_card" />

            Agency PAN

          </div>


          <div class="row q-col-gutter-md">

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.agencyPanNumber"
                outlined
                dense
                label="Agency PAN Number"
              >

                <template #prepend>
                  <q-icon name="credit_card" />
                </template>

              </q-input>

            </div>


            <div class="col-12 col-md-6">

              <q-file
                v-model="editFiles.agencyPanPhoto"
                outlined
                dense
                label="Agency PAN Photo"
                accept="image/*,.pdf"
                clearable
              >

                <template #prepend>
                  <q-icon name="image" />
                </template>

              </q-file>

            </div>

          </div>


          <!-- ===================================================
               TAN
          ==================================================== -->

          <div class="form-section-title q-mt-xl">

            <q-icon name="account_balance" />

            Agency TAN

          </div>


          <div class="row q-col-gutter-md">

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.agencyTanNumber"
                outlined
                dense
                label="Agency TAN Number"
              >

                <template #prepend>
                  <q-icon name="account_balance" />
                </template>

              </q-input>

            </div>


            <div class="col-12 col-md-6">

              <q-file
                v-model="editFiles.agencyTanPhoto"
                outlined
                dense
                label="Agency TAN Photo"
                accept="image/*,.pdf"
                clearable
              >

                <template #prepend>
                  <q-icon name="image" />
                </template>

              </q-file>

            </div>

          </div>


          <!-- ===================================================
               FSSAI
          ==================================================== -->

          <div class="form-section-title q-mt-xl">

            <q-icon name="restaurant" />

            Agency FSSAI

          </div>


          <div class="row q-col-gutter-md">

            <div class="col-12 col-md-4">

              <q-input
                v-model="editForm.agencyFssaiNumber"
                outlined
                dense
                label="FSSAI Number"
              >

                <template #prepend>
                  <q-icon name="restaurant" />
                </template>

              </q-input>

            </div>


            <div class="col-12 col-md-4">

              <q-input
                v-model="editForm.agencyFssaiExpiryDate"
                outlined
                dense
                type="date"
                label="FSSAI Expiry Date"
              />

            </div>


            <div class="col-12 col-md-4">

              <q-file
                v-model="editFiles.agencyFssaiPhoto"
                outlined
                dense
                label="FSSAI Photo"
                accept="image/*,.pdf"
                clearable
              >

                <template #prepend>
                  <q-icon name="image" />
                </template>

              </q-file>

            </div>

          </div>


          <!-- ===================================================
               REGISTRATION
          ==================================================== -->

          <div class="form-section-title q-mt-xl">

            <q-icon name="app_registration" />

            Agency Registration

          </div>


          <div class="row q-col-gutter-md">

            <div class="col-12 col-md-4">

              <q-input
                v-model="editForm.agencyRegistrationNumber"
                outlined
                dense
                label="Registration Number"
              >

                <template #prepend>
                  <q-icon name="app_registration" />
                </template>

              </q-input>

            </div>


            <div class="col-12 col-md-4">

              <q-input
                v-model="editForm.agencyRegistrationExpiryDate"
                outlined
                dense
                type="date"
                label="Registration Expiry Date"
              />

            </div>


            <div class="col-12 col-md-4">

              <q-file
                v-model="editFiles.agencyRegistrationPhoto"
                outlined
                dense
                label="Registration Photo"
                accept="image/*,.pdf"
                clearable
              >

                <template #prepend>
                  <q-icon name="image" />
                </template>

              </q-file>

            </div>

          </div>


          <!-- ===================================================
               AGENCY PHOTO
          ==================================================== -->

          <div class="form-section-title q-mt-xl">

            <q-icon name="photo_library" />

            Agency Photos

          </div>


          <div class="row q-col-gutter-md">

            <div class="col-12 col-md-6">

              <q-file
                v-model="editFiles.agencyPhoto"
                outlined
                dense
                label="Agency Photo"
                accept="image/*"
                clearable
              >

                <template #prepend>
                  <q-icon name="photo_library" />
                </template>

              </q-file>

            </div>

          </div>


          <!-- ===================================================
               OTHER DOCUMENT
          ==================================================== -->

          <div class="form-section-title q-mt-xl">

            <q-icon name="folder" />

            Other Document

          </div>


          <div class="row q-col-gutter-md">

            <div class="col-12 col-md-6">

              <q-input
                v-model="editForm.agencyOtherDocumentName"
                outlined
                dense
                label="Other Document Name"
              >

                <template #prepend>
                  <q-icon name="description" />
                </template>

              </q-input>

            </div>

          </div>

        </q-card-section>


        <!-- =====================================================
             DIALOG ACTIONS
        ====================================================== -->

        <q-separator />

        <q-card-actions
          align="right"
          class="dialog-actions"
        >

          <q-btn
            flat
            color="grey-7"
            label="Cancel"
            no-caps
            v-close-popup
          />

          <q-btn
            color="primary"
            icon="save"
            label="Save Changes"
            unelevated
            no-caps
            :loading="saving"
            @click="updateProfile"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>

import {
  ref,
  reactive,
  onMounted
} from 'vue'

import {
  useQuasar
} from 'quasar'

import axios from 'axios'


const $q = useQuasar()


// =========================================================
// DEFAULT PROFILE IMAGE
// =========================================================

const defaultImage =
  'https://cdn.quasar.dev/img/boy-avatar.png'

const profileImage =
  ref(defaultImage)

const imageInput =
  ref(null)


// =========================================================
// PROFILE DATA
// =========================================================

const profile = reactive({

  id: null,

  agentId: '',

  name: '',

  email: '',

  mobile: '',

  gender: '',

  dateOfBirth: '',

  aadharNumber: '',

  aadharPhoto: '',

  address: '',

  state: '',

  city: '',

  pincode: '',

  image: '',

  joiningDate: '',

  commission: '',

  status: 'Active',


  // AGENCY

  agencyName: '',

  agencyOpening: '',

  agencyCellNumber: '',

  agencyEmail: '',

  agencyAddress: '',


  // GST

  gstNumber: '',

  gstCertificate: '',

  gstExpiryDate: '',


  // AGENCY CERTIFICATE

  agencyCertificate: '',

  agencyCertificateExpiryDate: '',


  // LICENSE

  agencyLicenseNumber: '',

  agencyLicenseExpiryDate: '',

  agencyLicensePhoto: '',


  // AGENCY PHOTO

  agencyPhoto: '',


  // PAN

  agencyPanNumber: '',

  agencyPanPhoto: '',


  // TAN

  agencyTanNumber: '',

  agencyTanPhoto: '',


  // FSSAI

  agencyFssaiNumber: '',

  agencyFssaiPhoto: '',

  agencyFssaiExpiryDate: '',


  // REGISTRATION

  agencyRegistrationNumber: '',

  agencyRegistrationPhoto: '',

  agencyRegistrationExpiryDate: '',


  // OTHER

  agencyOtherDocumentName: ''

})


// =========================================================
// EDIT DIALOG
// =========================================================

const editDialog =
  ref(false)

const saving =
  ref(false)


// =========================================================
// EDIT FORM
// =========================================================

const editForm = reactive({

  name: '',

  email: '',

  mobile: '',

  gender: '',

  dateOfBirth: '',

  aadharNumber: '',

  address: '',

  state: '',

  city: '',

  pincode: '',


  agencyName: '',

  agencyOpening: '',

  agencyCellNumber: '',

  agencyEmail: '',

  agencyAddress: '',


  gstNumber: '',

  gstExpiryDate: '',


  agencyCertificateExpiryDate: '',


  agencyLicenseNumber: '',

  agencyLicenseExpiryDate: '',


  agencyPanNumber: '',


  agencyTanNumber: '',


  agencyFssaiNumber: '',

  agencyFssaiExpiryDate: '',


  agencyRegistrationNumber: '',

  agencyRegistrationExpiryDate: '',


  agencyOtherDocumentName: ''

})


// =========================================================
// FILE FORM
// =========================================================

const editFiles = reactive({

  aadharPhoto: null,

  gstCertificate: null,

  agencyCertificate: null,

  agencyLicensePhoto: null,

  agencyPhoto: null,

  agencyPanPhoto: null,

  agencyTanPhoto: null,

  agencyFssaiPhoto: null,

  agencyRegistrationPhoto: null

})


// =========================================================
// GENDER OPTIONS
// =========================================================

const genderOptions = [

  {
    label: 'Male',
    value: 'Male'
  },

  {
    label: 'Female',
    value: 'Female'
  },

  {
    label: 'Other',
    value: 'Other'
  }

]


// =========================================================
// GET PROFILE
// =========================================================

const getProfile = async () => {

  try {

    $q.loading.show({
      message: 'Loading profile...'
    })


    /*
     * API ENDPOINT
     *
     * Change according to your backend.
     */

    const response =
      await axios.get(
        '/agents/profile'
      )


    const data =
      response.data?.data ||
      response.data


    Object.assign(
      profile,
      {

        id:
          data.id || null,

        agentId:
          data.agentId ||
          data.agent_id ||
          '',

        name:
          data.name || '',

        email:
          data.email || '',

        mobile:
          data.mobile ||
          data.phone ||
          '',

        gender:
          data.gender || '',

        dateOfBirth:
          data.dateOfBirth ||
          data.date_of_birth ||
          '',

        aadharNumber:
          data.aadharNumber ||
          data.aadhar_number ||
          '',

        aadharPhoto:
          data.aadharPhoto ||
          data.aadhar_photo ||
          '',

        address:
          data.address || '',

        state:
          data.state || '',

        city:
          data.city || '',

        pincode:
          data.pincode || '',

        image:
          data.image ||
          data.profileImage ||
          '',

        joiningDate:
          data.joiningDate ||
          data.joining_date ||
          '',

        commission:
          data.commission
            ? `${data.commission}%`
            : '',

        status:
          data.status ||
          'Active',


        // AGENCY

        agencyName:
          data.agencyName ||
          data.agency_name ||
          '',

        agencyOpening:
          data.agencyOpening ||
          data.agency_opening ||
          '',

        agencyCellNumber:
          data.agencyCellNumber ||
          data.agency_cell_number ||
          '',

        agencyEmail:
          data.agencyEmail ||
          data.agency_email ||
          '',

        agencyAddress:
          data.agencyAddress ||
          data.agency_address ||
          '',


        // GST

        gstNumber:
          data.gstNumber ||
          data.gst_number ||
          '',

        gstCertificate:
          data.gstCertificate ||
          data.gst_certificate ||
          '',

        gstExpiryDate:
          data.gstExpiryDate ||
          data.gst_expiry_date ||
          '',


        // CERTIFICATE

        agencyCertificate:
          data.agencyCertificate ||
          data.agency_certificate ||
          '',

        agencyCertificateExpiryDate:
          data.agencyCertificateExpiryDate ||
          data.agency_certificate_expiry_date ||
          '',


        // LICENSE

        agencyLicenseNumber:
          data.agencyLicenseNumber ||
          data.agency_license_number ||
          '',

        agencyLicenseExpiryDate:
          data.agencyLicenseExpiryDate ||
          data.agency_license_expiry_date ||
          '',

        agencyLicensePhoto:
          data.agencyLicensePhoto ||
          data.agency_license_photo ||
          '',


        // AGENCY PHOTO

        agencyPhoto:
          data.agencyPhoto ||
          data.agency_photo ||
          '',


        // PAN

        agencyPanNumber:
          data.agencyPanNumber ||
          data.agency_pan_number ||
          '',

        agencyPanPhoto:
          data.agencyPanPhoto ||
          data.agency_pan_photo ||
          '',


        // TAN

        agencyTanNumber:
          data.agencyTanNumber ||
          data.agency_tan_number ||
          '',

        agencyTanPhoto:
          data.agencyTanPhoto ||
          data.agency_tan_photo ||
          '',


        // FSSAI

        agencyFssaiNumber:
          data.agencyFssaiNumber ||
          data.agency_fssai_number ||
          '',

        agencyFssaiPhoto:
          data.agencyFssaiPhoto ||
          data.agency_fssai_photo ||
          '',

        agencyFssaiExpiryDate:
          data.agencyFssaiExpiryDate ||
          data.agency_fssai_expiry_date ||
          '',


        // REGISTRATION

        agencyRegistrationNumber:
          data.agencyRegistrationNumber ||
          data.agency_registration_number ||
          '',

        agencyRegistrationPhoto:
          data.agencyRegistrationPhoto ||
          data.agency_registration_photo ||
          '',

        agencyRegistrationExpiryDate:
          data.agencyRegistrationExpiryDate ||
          data.agency_registration_expiry_date ||
          '',


        // OTHER

        agencyOtherDocumentName:
          data.agencyOtherDocumentName ||
          data.agency_other_document_name ||
          ''

      }
    )


    if (profile.image) {

      profileImage.value =
        profile.image

    }

  } catch (error) {

    console.error(
      'Get Profile Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        error.response?.data?.message ||
        'Unable to load profile'

    })

  } finally {

    $q.loading.hide()

  }

}


// =========================================================
// OPEN EDIT DIALOG
// =========================================================

const openEditDialog = () => {

  Object.assign(
    editForm,
    {

      name: profile.name,

      email: profile.email,

      mobile: profile.mobile,

      gender: profile.gender,

      dateOfBirth: profile.dateOfBirth,

      aadharNumber:
        profile.aadharNumber,

      address:
        profile.address,

      state:
        profile.state,

      city:
        profile.city,

      pincode:
        profile.pincode,


      agencyName:
        profile.agencyName,

      agencyOpening:
        profile.agencyOpening,

      agencyCellNumber:
        profile.agencyCellNumber,

      agencyEmail:
        profile.agencyEmail,

      agencyAddress:
        profile.agencyAddress,


      gstNumber:
        profile.gstNumber,

      gstExpiryDate:
        profile.gstExpiryDate,


      agencyCertificateExpiryDate:
        profile.agencyCertificateExpiryDate,


      agencyLicenseNumber:
        profile.agencyLicenseNumber,

      agencyLicenseExpiryDate:
        profile.agencyLicenseExpiryDate,


      agencyPanNumber:
        profile.agencyPanNumber,


      agencyTanNumber:
        profile.agencyTanNumber,


      agencyFssaiNumber:
        profile.agencyFssaiNumber,

      agencyFssaiExpiryDate:
        profile.agencyFssaiExpiryDate,


      agencyRegistrationNumber:
        profile.agencyRegistrationNumber,

      agencyRegistrationExpiryDate:
        profile.agencyRegistrationExpiryDate,


      agencyOtherDocumentName:
        profile.agencyOtherDocumentName

    }
  )


  // Clear old selected files

  Object.keys(editFiles)
    .forEach(key => {
      editFiles[key] = null
    })


  editDialog.value = true

}


// =========================================================
// UPDATE PROFILE
// =========================================================

const updateProfile = async () => {

  if (!editForm.name.trim()) {

    $q.notify({

      type: 'warning',

      message:
        'Please enter your full name'

    })

    return

  }


  try {

    saving.value = true


    /*
     * FormData is used because the form
     * contains document/photo uploads.
     */

    const formData =
      new FormData()


    // =====================================================
    // TEXT FIELDS
    // =====================================================

    Object.keys(editForm)
      .forEach(key => {

        formData.append(
          key,
          editForm[key] ?? ''
        )

      })


    // =====================================================
    // FILE FIELDS
    // =====================================================

    Object.keys(editFiles)
      .forEach(key => {

        if (editFiles[key]) {

          formData.append(
            key,
            editFiles[key]
          )

        }

      })


    /*
     * API ENDPOINT
     *
     * Change according to your backend.
     */

    const response =
      await axios.post(
        '/agents/profile',
        formData
      )


    const data =
      response.data?.data ||
      response.data


    // Update local profile

    Object.assign(
      profile,
      {

        ...editForm,

        aadharPhoto:
          data.aadharPhoto ||
          data.aadhar_photo ||
          profile.aadharPhoto,

        gstCertificate:
          data.gstCertificate ||
          data.gst_certificate ||
          profile.gstCertificate,

        agencyCertificate:
          data.agencyCertificate ||
          data.agency_certificate ||
          profile.agencyCertificate,

        agencyLicensePhoto:
          data.agencyLicensePhoto ||
          data.agency_license_photo ||
          profile.agencyLicensePhoto,

        agencyPhoto:
          data.agencyPhoto ||
          data.agency_photo ||
          profile.agencyPhoto,

        agencyPanPhoto:
          data.agencyPanPhoto ||
          data.agency_pan_photo ||
          profile.agencyPanPhoto,

        agencyTanPhoto:
          data.agencyTanPhoto ||
          data.agency_tan_photo ||
          profile.agencyTanPhoto,

        agencyFssaiPhoto:
          data.agencyFssaiPhoto ||
          data.agency_fssai_photo ||
          profile.agencyFssaiPhoto,

        agencyRegistrationPhoto:
          data.agencyRegistrationPhoto ||
          data.agency_registration_photo ||
          profile.agencyRegistrationPhoto

      }
    )


    editDialog.value = false


    $q.notify({

      type: 'positive',

      message:
        'Profile updated successfully'

    })

  } catch (error) {

    console.error(
      'Update Profile Error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        error.response?.data?.message ||
        'Unable to update profile'

    })

  } finally {

    saving.value = false

  }

}


// =========================================================
// PROFILE IMAGE UPLOAD
// =========================================================

const triggerImageUpload = () => {

  imageInput.value?.click()

}


const handleImageUpload =
  async event => {

    const file =
      event.target.files?.[0]


    if (!file) {
      return
    }


    if (
      !file.type.startsWith(
        'image/'
      )
    ) {

      $q.notify({

        type: 'warning',

        message:
          'Please select a valid image'

      })

      return

    }


    const oldImage =
      profileImage.value


    // Preview immediately

    profileImage.value =
      URL.createObjectURL(file)


    try {

      const formData =
        new FormData()


      formData.append(
        'image',
        file
      )


      const response =
        await axios.post(
          '/agents/profile/image',
          formData
        )


      const data =
        response.data?.data ||
        response.data


      if (data.image) {

        profile.image =
          data.image

        profileImage.value =
          data.image

      }


      $q.notify({

        type: 'positive',

        message:
          'Profile photo updated successfully'

      })

    } catch (error) {

      console.error(
        'Image Upload Error:',
        error
      )


      profileImage.value =
        oldImage


      $q.notify({

        type: 'negative',

        message:
          error.response?.data?.message ||
          'Unable to upload profile photo'

      })

    } finally {

      event.target.value = ''

    }

  }


// =========================================================
// OPEN DOCUMENT
// =========================================================

const openDocument = url => {

  if (!url) {
    return
  }


  window.open(
    url,
    '_blank'
  )

}


// =========================================================
// PAGE LOAD
// =========================================================

onMounted(() => {

  getProfile()

})

</script>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.agent-profile-page {

  min-height: 100vh;

  padding: 26px;

  background:
    linear-gradient(
      135deg,
      #f5f7fb 0%,
      #eef3fa 100%
    );

  color: #111827;

}


/* =========================================================
   HEADER
========================================================= */

.page-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  margin-bottom: 24px;

}


.page-title {

  font-size: 28px;

  font-weight: 800;

  color: #111827;

  letter-spacing: -0.4px;

}


.page-subtitle {

  margin-top: 5px;

  font-size: 14px;

  color: #667085;

}


.edit-profile-btn {

  border-radius: 9px;

  padding-left: 18px;

  padding-right: 18px;

}


/* =========================================================
   MAIN CARD
========================================================= */

.main-profile-card {

  max-width: 1250px;

  margin: 0 auto;

  overflow: hidden;

  border-radius: 18px;

  background: #ffffff;

  box-shadow:
    0 10px 35px
    rgba(15, 23, 42, 0.07);

}


/* =========================================================
   HERO
========================================================= */

.profile-hero {

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 30px;

  color: white;

  background:
    linear-gradient(
      135deg,
      #1976d2,
      #174ea6
    );

}


.hero-content {

  display: flex;

  align-items: center;

  gap: 22px;

}


.profile-photo-wrapper {

  position: relative;

  width: 115px;

  height: 115px;

}


.profile-avatar {

  border: 4px solid rgba(
    255,
    255,
    255,
    0.9
  );

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, 0.2);

}


.profile-avatar img {

  width: 100%;

  height: 100%;

  object-fit: cover;

}


.camera-btn {

  position: absolute;

  right: -5px;

  bottom: 0;

  border: 3px solid white;

}


/* =========================================================
   HERO INFO
========================================================= */

.hero-name {

  font-size: 27px;

  font-weight: 800;

  color: #ffffff;

}


.hero-role {

  display: flex;

  align-items: center;

  gap: 6px;

  margin-top: 4px;

  font-size: 14px;

  color: rgba(
    255,
    255,
    255,
    0.82
  );

}


.hero-contact {

  display: flex;

  flex-wrap: wrap;

  gap: 18px;

  margin-top: 10px;

}


.hero-contact span {

  display: flex;

  align-items: center;

  gap: 5px;

  font-size: 13px;

  color: rgba(
    255,
    255,
    255,
    0.9
  );

}


.status-chip {

  margin-top: 10px;

}


/* =========================================================
   AGENT ID
========================================================= */

.hero-agent-id {

  min-width: 145px;

  padding: 14px 18px;

  border-radius: 12px;

  background:
    rgba(
      255,
      255,
      255,
      0.12
    );

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.18
    );

  text-align: center;

}


.hero-id-label {

  font-size: 10px;

  letter-spacing: 1px;

  color:
    rgba(
      255,
      255,
      255,
      0.7
    );

}


.hero-id-value {

  margin-top: 4px;

  font-size: 17px;

  font-weight: 700;

  color: #ffffff;

}


/* =========================================================
   PROFILE SECTION
========================================================= */

.profile-section {

  padding: 28px 30px;

}


.section-header {

  display: flex;

  align-items: center;

  gap: 13px;

  margin-bottom: 22px;

}


.section-icon {

  width: 44px;

  height: 44px;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  border-radius: 12px;

  font-size: 22px;

}


.section-icon.blue {

  background: #eaf2ff;

  color: #1976d2;

}


.section-icon.orange {

  background: #fff3e6;

  color: #f57c00;

}


.section-icon.green {

  background: #eaf9f0;

  color: #16a34a;

}


.section-icon.purple {

  background: #f3edff;

  color: #7c3aed;

}


.section-icon.grey {

  background: #f1f3f5;

  color: #475467;

}


.section-title {

  font-size: 18px;

  font-weight: 750;

  color: #111827;

}


.section-description {

  margin-top: 3px;

  font-size: 12px;

  color: #667085;

}


/* =========================================================
   INFO GRID
========================================================= */

.info-grid {

  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 14px;

}


.info-box {

  display: flex;

  align-items: flex-start;

  gap: 13px;

  min-height: 75px;

  padding: 15px 16px;

  border:
    1px solid
    #e7eaf0;

  border-radius: 12px;

  background: #fbfcfe;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

}


.info-box:hover {

  transform: translateY(-1px);

  border-color: #d6dce7;

  box-shadow:
    0 5px 18px
    rgba(15, 23, 42, 0.05);

}


.info-box.full-width {

  grid-column: 1 / -1;

}


.info-icon {

  width: 38px;

  height: 38px;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  border-radius: 10px;

  background: #eaf2ff;

  color: #1976d2;

}


.orange-bg {

  background: #fff3e6;

  color: #f57c00;

}


.green-bg {

  background: #eaf9f0;

  color: #16a34a;

}


.info-label {

  margin-bottom: 5px;

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 0.5px;

  text-transform: uppercase;

  color: #667085;

}


.info-value {

  font-size: 14px;

  line-height: 1.5;

  font-weight: 600;

  color: #111827;

  word-break: break-word;

}


/* =========================================================
   DOCUMENT GRID
========================================================= */

.document-grid {

  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 15px;

}


.document-card {

  display: flex;

  align-items: center;

  gap: 14px;

  min-height: 90px;

  padding: 16px;

  border:
    1px solid
    #e6e9ef;

  border-radius: 13px;

  background: #fbfcfe;

}


.document-icon {

  width: 45px;

  height: 45px;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  border-radius: 11px;

  background: #eef4ff;

  color: #1976d2;

}


.document-label {

  font-size: 11px;

  font-weight: 700;

  color: #667085;

  text-transform: uppercase;

}


.document-value {

  margin-top: 4px;

  font-size: 14px;

  font-weight: 650;

  color: #111827;

}


.document-meta {

  margin-top: 5px;

  font-size: 11px;

  color: #667085;

}


.document-empty {

  margin-top: 5px;

  font-size: 12px;

  color: #98a2b3;

}


/* =========================================================
   ACCOUNT
========================================================= */

.account-grid {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 15px;

}


.account-card {

  display: flex;

  align-items: center;

  gap: 14px;

  padding: 18px;

  border-radius: 13px;

  border:
    1px solid
    #e7eaf0;

  background: #fbfcfe;

}


.account-label {

  font-size: 11px;

  color: #667085;

}


.account-value {

  margin-top: 3px;

  font-size: 15px;

  font-weight: 700;

  color: #111827;

}


/* =========================================================
   EDIT DIALOG
========================================================= */

.edit-dialog {

  width: 850px;

  max-width: 96vw;

  max-height: 92vh;

  border-radius: 16px;

  overflow: hidden;

}


.dialog-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 20px 24px;

}


.dialog-title {

  font-size: 21px;

  font-weight: 750;

  color: #111827;

}


.dialog-subtitle {

  margin-top: 4px;

  font-size: 12px;

  color: #667085;

}


.dialog-body {

  max-height: 70vh;

  overflow-y: auto;

  padding: 24px;

}


.form-section-title {

  display: flex;

  align-items: center;

  gap: 8px;

  margin-bottom: 18px;

  padding-bottom: 9px;

  border-bottom:
    1px solid
    #edf0f5;

  font-size: 15px;

  font-weight: 750;

  color: #1976d2;

}


.form-section-title .q-icon {

  font-size: 20px;

}


/* =========================================================
   FORM TEXT COLORS
========================================================= */

:deep(.q-field__label) {

  color: #667085 !important;

  font-weight: 500;

}


:deep(.q-field__native),

:deep(.q-field__input) {

  color: #111827 !important;

  font-weight: 500;

}


:deep(textarea.q-field__native) {

  color: #111827 !important;

}


:deep(.q-field__native::placeholder),

:deep(.q-field__input::placeholder) {

  color: #98a2b3 !important;

  opacity: 1;

}


:deep(.q-field__prepend),

:deep(.q-field__append) {

  color: #1976d2 !important;

}


:deep(.q-field--focused .q-field__label) {

  color: #1976d2 !important;

}


:deep(.q-field--outlined .q-field__control:before) {

  border-color: #d0d5dd !important;

}


:deep(.q-field--outlined:hover .q-field__control:before) {

  border-color: #1976d2 !important;

}


:deep(.q-field--focused .q-field__control:after) {

  border-color: #1976d2 !important;

}


:deep(.q-select .q-field__native) {

  color: #111827 !important;

}


:deep(.q-menu) {

  color: #111827 !important;

}


:deep(.q-item__label) {

  color: #111827 !important;

}


/* =========================================================
   DIALOG ACTIONS
========================================================= */

.dialog-actions {

  padding: 15px 24px;

  background: #fafbfc;

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 900px) {

  .document-grid {

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

  }

}


@media (max-width: 700px) {

  .agent-profile-page {

    padding: 15px;

  }


  .page-header {

    align-items: flex-start;

    flex-direction: column;

  }


  .edit-profile-btn {

    width: 100%;

  }


  .profile-hero {

    align-items: flex-start;

    flex-direction: column;

    gap: 22px;

    padding: 24px 20px;

  }


  .hero-content {

    align-items: flex-start;

  }


  .hero-name {

    font-size: 22px;

  }


  .hero-agent-id {

    width: 100%;

  }


  .profile-section {

    padding: 22px 18px;

  }


  .info-grid {

    grid-template-columns: 1fr;

  }


  .info-box.full-width {

    grid-column: auto;

  }


  .document-grid {

    grid-template-columns: 1fr;

  }


  .account-grid {

    grid-template-columns: 1fr;

  }

}


@media (max-width: 500px) {

  .hero-content {

    flex-direction: column;

  }


  .profile-photo-wrapper {

    margin: 0 auto;

  }


  .hero-info {

    width: 100%;

    text-align: center;

  }


  .hero-role,

  .hero-contact {

    justify-content: center;

  }


  .hero-contact {

    flex-direction: column;

    gap: 5px;

  }


  .section-title {

    font-size: 16px;

  }


  .dialog-body {

    padding: 18px 15px;

  }


  .dialog-header {

    padding: 17px;

  }

}

</style>
