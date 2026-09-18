<template>
  <q-page class="driver-profile-page q-pa-md q-pa-lg-lg">
    <!-- =====================================================
         ONBOARDING PROGRESS TRACKER
    ====================================================== -->
    <q-card class="onboarding-progress-card q-mb-lg" flat bordered>
      <q-card-section class="q-pa-md">
        <div class="row items-center justify-between q-col-gutter-sm">
          <div class="col-12 col-md-6">
            <div class="row items-center">
              <q-avatar size="36px" color="primary" text-color="white" icon="badge" class="q-mr-sm" />
              <div>
                <div class="text-subtitle1 text-weight-bold">Driver Onboarding Journey</div>
                <div class="text-caption text-grey-7">Step 1 of 4: Complete your driver profile details</div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="row items-center justify-end q-gutter-x-sm no-wrap text-center stepper-pills">
              <!-- Step 1: Profile -->
              <div class="step-pill" :class="{ 'step-done': isProfileCompleted, 'step-active': currentStage === 1 }">
                <q-icon :name="isProfileCompleted ? 'check_circle' : 'person'" size="18px" />
                <span class="gt-xs">1. Profile</span>
              </div>
              <q-icon name="chevron_right" color="grey-5" size="18px" />

              <!-- Step 2: Subscription -->
              <div class="step-pill" :class="{ 'step-done': isSubscribed, 'step-active': currentStage === 2 }">
                <q-icon :name="isSubscribed ? 'check_circle' : 'card_membership'" size="18px" />
                <span class="gt-xs">2. Subscription</span>
              </div>
              <q-icon name="chevron_right" color="grey-5" size="18px" />

              <!-- Step 3: Verification -->
              <div class="step-pill" :class="{ 'step-done': isVerified, 'step-active': currentStage === 3 }">
                <q-icon :name="isVerified ? 'check_circle' : 'hourglass_top'" size="18px" />
                <span class="gt-xs">3. Verification</span>
              </div>
              <q-icon name="chevron_right" color="grey-5" size="18px" />

              <!-- Step 4: Ready -->
              <div class="step-pill" :class="{ 'step-done': canTakeRides, 'step-active': currentStage === 4 }">
                <q-icon name="directions_car" size="18px" />
                <span class="gt-xs">4. Drive</span>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- =====================================================
         PAGE HEADER & VIEW TOGGLE
    ====================================================== -->
    <div class="page-header q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">Driver Profile Panel</div>
        <div class="text-grey-7 q-mt-xs">
          {{ viewMode === 'wizard' ? 'Complete your profile step-by-step to unlock subscription' : 'Manage your driver profile, vehicle details, and documents' }}
        </div>
      </div>

      <div class="row items-center q-gutter-sm">
        <q-btn-toggle
          v-model="viewMode"
          toggle-color="primary"
          color="white"
          text-color="grey-8"
          no-caps
          unelevated
          rounded
          :options="[
            { label: 'Step-by-Step Setup', value: 'wizard', icon: 'auto_fix_high' },
            { label: 'Profile Overview', value: 'overview', icon: 'view_agenda' }
          ]"
        />
        <q-btn
          v-if="viewMode === 'overview'"
          color="primary"
          icon="edit"
          label="Edit Profile"
          no-caps
          unelevated
          class="edit-profile-btn"
          @click="startEdit"
        />
      </div>
    </div>

    <!-- =====================================================
         MODE 1: STEP-BY-STEP WIZARD (REQUESTED FEATURE)
    ====================================================== -->
    <div v-if="viewMode === 'wizard'" class="wizard-container q-mb-xl">
      <q-card class="modern-card wizard-card" flat bordered>
        <q-card-section class="q-pa-none">
          <q-stepper
            v-model="step"
            ref="stepper"
            color="primary"
            animated
            header-nav
            class="stepper-custom"
          >
            <!-- ================= STEP 1: PERSONAL INFO ================= -->
            <q-step
              :name="1"
              title="Personal Details"
              caption="Basic information & photo"
              icon="person"
              :done="step > 1"
            >
              <div class="text-h6 text-weight-bold q-mb-xs">Personal & Contact Details</div>
              <div class="text-caption text-grey-7 q-mb-lg">Provide your primary contact and identification information</div>

              <!-- Profile Picture Upload -->
              <div class="row items-center q-mb-lg">
                <div class="profile-image-wrapper q-mr-lg">
                  <q-avatar size="100px" class="profile-avatar shadow-2">
                    <img v-if="profile.photo" :src="profile.photo.startsWith('blob:') ? profile.photo : `${imagesBaseUrls}${profile.photo}`" alt="Driver" />
                    <span v-else class="profile-initials text-h5">{{ getInitials(profile.name) }}</span>
                  </q-avatar>
                  <q-btn
                    round
                    unelevated
                    color="primary"
                    icon="photo_camera"
                    class="profile-camera-btn"
                    @click="openProfilePicker"
                  >
                    <q-tooltip>Upload Photo</q-tooltip>
                  </q-btn>
                  <input ref="profileInput" type="file" accept="image/*" class="hidden" @change="handleProfilePhoto" />
                </div>
                <div>
                  <div class="text-subtitle2 text-weight-bold">Driver Photograph</div>
                  <div class="text-caption text-grey-6">Upload a clear passport-size photo showing your face clearly.</div>
                  <q-btn outline color="primary" icon="upload" label="Choose Photo" size="sm" no-caps class="q-mt-xs" @click="openProfilePicker" />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.name" label="Full Name *" outlined dense placeholder="Enter full name" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.phone" label="Phone Number *" outlined dense placeholder="e.g. +91 9876543210" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.email" label="Email Address *" type="email" outlined dense placeholder="driver@batohidrive.com" />
                </div>
                <div class="col-12 col-md-6">
                  <q-select v-model="profile.gender" :options="genderOptions" label="Gender" outlined dense />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.dateOfBirth" label="Date of Birth" outlined dense placeholder="YYYY-MM-DD">
                    <template #append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="profile.dateOfBirth" mask="YYYY-MM-DD" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.emergencyContactName" label="Emergency Contact Name" outlined dense placeholder="Guardian / Family member name" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.emergencyContactNumber" label="Emergency Contact Number" outlined dense placeholder="Guardian / Family contact" />
                </div>
              </div>
            </q-step>

            <!-- ================= STEP 2: ADDRESS & AGENCY ================= -->
            <q-step
              :name="2"
              title="Address & Agency"
              caption="Location & partnership"
              icon="home"
              :done="step > 2"
            >
              <div class="text-h6 text-weight-bold q-mb-xs">Address & Agency Type</div>
              <div class="text-caption text-grey-7 q-mb-lg">Enter your residential address and agency affiliation</div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-select v-model="profile.agencyType" :options="agencyTypeOptions" label="Agency Type" outlined dense />
                </div>
                <div class="col-12 col-md-6">
                  <q-select v-model="profile.state" :options="stateOptions" label="State *" outlined dense />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.city" label="City *" outlined dense placeholder="Enter city" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.pincode" label="Pin Code" outlined dense placeholder="e.g. 400001" />
                </div>
                <div class="col-12">
                  <q-input v-model="profile.address" label="Complete Residential Address *" type="textarea" rows="3" outlined dense placeholder="Flat / House No, Street, Landmark" />
                </div>
              </div>
            </q-step>

            <!-- ================= STEP 3: IDENTITY DOCUMENTS ================= -->
            <q-step
              :name="3"
              title="Identity Docs"
              caption="Aadhaar & PAN cards"
              icon="badge"
              :done="step > 3"
            >
              <div class="text-h6 text-weight-bold q-mb-xs">Government Identity Verification</div>
              <div class="text-caption text-grey-7 q-mb-lg">Upload your Aadhaar Card and PAN Card for compliance and identity check</div>

              <div class="row q-col-gutter-lg">
                <!-- Aadhaar Card Section -->
                <div class="col-12 col-md-6">
                  <q-card flat bordered class="q-pa-md rounded-borders full-height">
                    <div class="row items-center q-mb-md">
                      <q-icon name="badge" size="24px" color="primary" class="q-mr-sm" />
                      <div class="text-subtitle1 text-weight-bold">Aadhaar Card</div>
                    </div>
                    <q-input v-model="profile.aadharNumber" label="Aadhaar Number (12 digits) *" outlined dense maxlength="12" placeholder="1234 5678 9012" class="q-mb-md" />

                    <div class="document-upload-box">
                      <div class="document-icon"><q-icon name="description" size="28px" /></div>
                      <div class="document-details">
                        <div class="text-weight-medium">Aadhaar Photo</div>
                        <div class="text-caption text-grey-6">{{ profile.aadharPhoto ? (rawFiles.aadharPhoto ? rawFiles.aadharPhoto.name : 'Uploaded') : 'Not selected' }}</div>
                      </div>
                      <q-btn outline color="primary" icon="upload" label="Upload" no-caps size="sm" @click="openAadharPicker" />
                      <input ref="aadharInput" type="file" accept="image/*,.pdf" class="hidden" @change="handleAadharPhoto" />
                    </div>
                  </q-card>
                </div>

                <!-- PAN Card Section -->
                <div class="col-12 col-md-6">
                  <q-card flat bordered class="q-pa-md rounded-borders full-height">
                    <div class="row items-center q-mb-md">
                      <q-icon name="credit_card" size="24px" color="primary" class="q-mr-sm" />
                      <div class="text-subtitle1 text-weight-bold">PAN Card</div>
                    </div>
                    <q-input v-model="profile.panNumber" label="PAN Number (10 characters) *" outlined dense maxlength="10" placeholder="ABCDE1234F" class="q-mb-md" />

                    <div class="document-upload-box">
                      <div class="document-icon"><q-icon name="description" size="28px" /></div>
                      <div class="document-details">
                        <div class="text-weight-medium">PAN Photo</div>
                        <div class="text-caption text-grey-6">{{ profile.panPhoto ? (rawFiles.panPhoto ? rawFiles.panPhoto.name : 'Uploaded') : 'Not selected' }}</div>
                      </div>
                      <q-btn outline color="primary" icon="upload" label="Upload" no-caps size="sm" @click="openPanPicker" />
                      <input ref="panInput" type="file" accept="image/*,.pdf" class="hidden" @change="handlePanPhoto" />
                    </div>
                  </q-card>
                </div>
              </div>
            </q-step>

            <!-- ================= STEP 4: DRIVING LICENSE ================= -->
            <q-step
              :name="4"
              title="Driving License"
              caption="License & experience"
              icon="directions_car"
              :done="step > 4"
            >
              <div class="text-h6 text-weight-bold q-mb-xs">Driving License & Road Experience</div>
              <div class="text-caption text-grey-7 q-mb-lg">Ensure your commercial or private driving license is active and valid</div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.licenseNumber" label="Driving License Number *" outlined dense placeholder="e.g. MH0220210012345" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.experienceYears" label="Driving Experience (Years)" type="number" outlined dense placeholder="e.g. 5" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.licenseIssueDate" label="License Issue Date" outlined dense placeholder="YYYY-MM-DD">
                    <template #append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="profile.licenseIssueDate" mask="YYYY-MM-DD" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.licenseExpiry" label="License Expiry Date *" outlined dense placeholder="YYYY-MM-DD">
                    <template #append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="profile.licenseExpiry" mask="YYYY-MM-DD" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <div class="col-12">
                  <div class="document-upload-box">
                    <div class="document-icon"><q-icon name="credit_card" size="30px" /></div>
                    <div class="document-details">
                      <div class="text-weight-medium">Driving License Photo (Front & Back)</div>
                      <div class="text-caption text-grey-6">{{ profile.licensePhoto ? (rawFiles.licensePhoto ? rawFiles.licensePhoto.name : 'Uploaded') : 'Please upload license photo' }}</div>
                    </div>
                    <q-btn outline color="primary" icon="upload" label="Upload License" no-caps size="sm" @click="openLicensePicker" />
                    <input ref="licenseInput" type="file" accept="image/*,.pdf" class="hidden" @change="handleLicensePhoto" />
                  </div>
                </div>
              </div>
            </q-step>

            <!-- ================= STEP 5: VEHICLE & INSURANCE ================= -->
            <q-step
              :name="5"
              title="Vehicle & Insurance"
              caption="RC & policy details"
              icon="shield"
              :done="step > 5"
            >
              <div class="text-h6 text-weight-bold q-mb-xs">Vehicle Registration & Insurance Details</div>
              <div class="text-caption text-grey-7 q-mb-lg">Enter policy and vehicle data to ensure passengers are protected</div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.vehicleNumber" label="Vehicle Registration Number *" outlined dense placeholder="e.g. MH 02 CD 4589" />
                </div>
                <div class="col-12 col-md-6">
                  <q-select v-model="profile.vehicleType" :options="['Sedan', 'Mini / Hatchback', 'SUV / Prime', 'Auto Rickshaw', 'Bike']" label="Vehicle Category" outlined dense />
                  <q-select
                    v-model="profile.vehicleType"
                    :options="vehicleTypeOptions"
                    option-label="label"
                    option-value="value"
                    emit-value
                    map-options
                    label="Vehicle Category *"
                    outlined
                    dense
                    @update:model-value="onVehicleTypeChange"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.insuranceNumber" label="Insurance Policy Number *" outlined dense placeholder="e.g. POL-88992211" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.insuranceExpiry" label="Insurance Expiry Date *" outlined dense placeholder="YYYY-MM-DD">
                    <template #append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="profile.insuranceExpiry" mask="YYYY-MM-DD" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <div class="col-12">
                  <div class="document-upload-box">
                    <div class="document-icon insurance-icon"><q-icon name="security" size="30px" /></div>
                    <div class="document-details">
                      <div class="text-weight-medium">Insurance Policy Document</div>
                      <div class="text-caption text-grey-6">{{ profile.insurancePhoto ? (rawFiles.insurancePhoto ? rawFiles.insurancePhoto.name : 'Uploaded') : 'Upload valid insurance policy' }}</div>
                    </div>
                    <q-btn outline color="primary" icon="upload" label="Upload Insurance" no-caps size="sm" @click="openInsurancePicker" />
                    <input ref="insuranceInput" type="file" accept="image/*,.pdf" class="hidden" @change="handleInsurancePhoto" />
                  </div>
                </div>
              </div>
            </q-step>

            <!-- ================= STEP 6: REVIEW & SUBMIT ================= -->
            <q-step
              :name="6"
              title="Review & Finish"
              caption="Proceed to Subscription"
              icon="check_circle"
            >
              <div class="text-center q-py-md">
                <div class="review-icon-circle q-mx-auto q-mb-md">
                  <q-icon name="task_alt" size="56px" color="positive" />
                </div>
                <div class="text-h5 text-weight-bolder text-dark">Profile Completion Ready!</div>
                <div class="text-body2 text-grey-7 q-mt-xs max-w-500 q-mx-auto">
                  All your profile details and required documents have been filled. Save your profile now and proceed to select your driver subscription plan.
                </div>
              </div>

              <!-- Summary Cards -->
              <div class="row q-col-gutter-md q-mt-md">
                <div class="col-12 col-md-6">
                  <q-card flat bordered class="q-pa-md rounded-borders">
                    <div class="text-subtitle2 text-weight-bold q-mb-xs">Driver Summary</div>
                    <div class="text-body2"><strong>Name:</strong> {{ profile.name }}</div>
                    <div class="text-body2"><strong>Phone:</strong> {{ profile.phone }}</div>
                    <div class="text-body2"><strong>City:</strong> {{ profile.city }}, {{ profile.state }}</div>
                    <div class="text-body2"><strong>Agency:</strong> {{ profile.agencyType }}</div>
                    <div class="row items-center q-mt-sm q-gutter-sm">
                      <div class="text-body2"><strong>Vehicle:</strong></div>
                      <q-badge
                        :color="profile.vehicleType === 'bike' ? 'blue-7' : profile.vehicleType === 'auto' ? 'orange-8' : 'green-8'"
                        text-color="white"
                        class="q-px-sm q-py-xs text-capitalize text-weight-bold"
                      >
                        <q-icon
                          :name="profile.vehicleType === 'bike' ? 'two_wheeler' : profile.vehicleType === 'auto' ? 'electric_rickshaw' : 'directions_car'"
                          size="14px"
                          class="q-mr-xs"
                        />
                        {{ vehicleTypeOptions.find(o => o.value === profile.vehicleType)?.label || profile.vehicleType || 'Not Selected' }}
                      </q-badge>
                    </div>
                  </q-card>
                </div>

                <div class="col-12 col-md-6">
                  <q-card flat bordered class="q-pa-md rounded-borders">
                    <div class="text-subtitle2 text-weight-bold q-mb-xs">Documents Checklist</div>
                    <div class="row items-center q-mb-xs"><q-icon name="check_circle" color="positive" size="16px" class="q-mr-xs" /> Aadhaar: {{ profile.aadharNumber || 'Entered' }}</div>
                    <div class="row items-center q-mb-xs"><q-icon name="check_circle" color="positive" size="16px" class="q-mr-xs" /> PAN: {{ profile.panNumber || 'Entered' }}</div>
                    <div class="row items-center q-mb-xs"><q-icon name="check_circle" color="positive" size="16px" class="q-mr-xs" /> License: {{ profile.licenseNumber || 'Entered' }}</div>
                    <div class="row items-center"><q-icon name="check_circle" color="positive" size="16px" class="q-mr-xs" /> Insurance: {{ profile.insuranceNumber || 'Entered' }}</div>
                  </q-card>
                </div>
              </div>

              <!-- Mandatory Next Step Callout -->
              <q-banner class="bg-primary text-white rounded-borders q-mt-lg">
                <template #avatar>
                  <q-icon name="card_membership" color="white" size="28px" />
                </template>
                <div class="text-subtitle2 text-weight-bold">Next Mandatory Step: Driver Subscription</div>
                <div class="text-caption">
                  Per Batohi driver guidelines, after saving your profile you must activate a 0% commission driver subscription pass, after which your documents will be sent for verification approval.
                </div>
              </q-banner>
            </q-step>

            <!-- Stepper Navigation Controls -->
            <template #navigation>
              <q-stepper-navigation class="row items-center justify-between q-pa-md bg-grey-1">
                <q-btn
                  v-if="step > 1"
                  flat
                  color="grey-8"
                  icon="arrow_back"
                  label="Back"
                  no-caps
                  @click="$refs.stepper.previous()"
                />
                <div v-else></div>

                <div class="row q-gutter-sm">
                  <q-btn
                    v-if="step < 6"
                    color="primary"
                    icon-right="arrow_forward"
                    label="Save & Continue"
                    no-caps
                    unelevated
                    class="q-px-lg text-weight-bold"
                    @click="$refs.stepper.next()"
                  />
                  <q-btn
                    v-else
                    color="positive"
                    icon="card_membership"
                    label="Complete Profile & Proceed to Subscription"
                    no-caps
                    unelevated
                    size="md"
                    class="q-px-xl text-weight-bolder"
                    :loading="saving"
                    @click="handleSaveAndProceed"
                  />
                </div>
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </q-card-section>
      </q-card>
    </div>

    <!-- =====================================================
         MODE 2: CLASSIC PROFILE OVERVIEW / EDIT VIEW
    ====================================================== -->
    <div v-else class="row q-col-gutter-lg">
      <!-- LEFT SIDEBAR -->
      <div class="col-12 col-md-4">
        <!-- PROFILE CARD -->
        <q-card class="modern-card profile-main-card">
          <q-card-section class="text-center q-pa-lg">
            <div class="profile-image-wrapper">
              <q-avatar size="125px" class="profile-avatar shadow-2">
                <img v-if="profile.photo" :src="profile.photo.startsWith('blob:') ? profile.photo : `${imagesBaseUrls}${profile.photo}`" alt="Driver Profile" />
                <span v-else class="profile-initials">{{ getInitials(profile.name) }}</span>
              </q-avatar>
              <q-btn round unelevated color="primary" icon="photo_camera" class="profile-camera-btn" @click="openProfilePicker">
                <q-tooltip> Change Profile Photo </q-tooltip>
              </q-btn>
            </div>

            <div class="text-h6 text-weight-bold q-mt-md">{{ profile.name || 'Driver Name' }}</div>
            <div class="text-grey-6 q-mt-xs">Driver ID: {{ profile.driverId }}</div>
            <q-badge :color="isVerified ? 'positive' : 'warning'" rounded class="q-mt-md status-badge">
              <q-icon :name="isVerified ? 'check_circle' : 'hourglass_top'" size="14px" class="q-mr-xs" />
              {{ isVerified ? 'Verified Driver' : 'Verification In Progress' }}
            </q-badge>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-lg">
            <div class="section-mini-title"> Contact Information </div>
            <div class="profile-info-item">
              <div class="info-icon"><q-icon name="phone" size="20px" /></div>
              <div class="info-content">
                <div class="text-caption text-grey-6"> Phone Number </div>
                <div class="text-weight-medium">{{ profile.phone || 'Not provided' }}</div>
              </div>
            </div>
            <div class="profile-info-item">
              <div class="info-icon"><q-icon name="email" size="20px" /></div>
              <div class="info-content">
                <div class="text-caption text-grey-6"> Email Address </div>
                <div class="text-weight-medium">{{ profile.email || 'Not provided' }}</div>
              </div>
            </div>
            <div class="profile-info-item">
              <div class="info-icon"><q-icon name="location_on" size="20px" /></div>
              <div class="info-content">
                <div class="text-caption text-grey-6"> Location </div>
                <div class="text-weight-medium">{{ profile.city || 'Not provided' }}, {{ profile.state || '' }}</div>
              </div>
            </div>
            <div class="profile-info-item">
              <div class="info-icon"><q-icon name="business" size="20px" /></div>
              <div class="info-content">
                <div class="text-caption text-grey-6"> Agency Type </div>
                <div class="text-weight-medium">{{ profile.agencyType }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- SUBSCRIPTION SHORTCUT CARD -->
        <q-card class="modern-card q-mt-lg" flat bordered>
          <q-card-section class="q-pa-lg">
            <div class="row items-center justify-between q-mb-sm">
              <div class="text-subtitle1 text-weight-bold">Driver Subscription</div>
              <q-badge :color="isSubscribed ? 'positive' : 'negative'">
                {{ isSubscribed ? 'Active' : 'Not Subscribed' }}
              </q-badge>
            </div>
            <div class="text-caption text-grey-7 q-mb-md">
              {{ isSubscribed ? `Current Plan: ${activePlan?.planName}` : 'An active plan is mandatory to receive customer ride requests.' }}
            </div>
            <q-btn
              color="primary"
              unelevated
              no-caps
              icon="card_membership"
              :label="isSubscribed ? 'Manage Subscription' : 'Get Subscription Pass'"
              class="full-width"
              @click="$router.push({ name: 'DriverSubscription' })"
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- RIGHT CONTENT -->
      <div class="col-12 col-md-8">
        <!-- PERSONAL INFORMATION -->
        <q-card class="modern-card q-mb-lg">
          <q-card-section class="card-header">
            <div class="section-heading">
              <div class="section-icon"><q-icon name="person" size="22px" /></div>
              <div>
                <div class="text-h6 text-weight-bold">Personal Information</div>
                <div class="text-caption text-grey-6">Your basic personal details</div>
              </div>
            </div>
            <q-btn flat round icon="edit" color="primary" @click="startEdit" />
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-lg">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input v-model="profile.name" label="Full Name" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="profile.phone" label="Phone Number" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="profile.email" label="Email Address" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="profile.dateOfBirth" label="Date of Birth" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-select v-model="profile.gender" :options="genderOptions" label="Gender" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="profile.emergencyContactName" label="Emergency Contact Name" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="profile.emergencyContactNumber" label="Emergency Contact Number" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-select v-model="profile.agencyType" :options="agencyTypeOptions" label="Agency Type" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="profile.city" label="City" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-select v-model="profile.state" :options="stateOptions" label="State" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12">
                <q-input v-model="profile.address" label="Address" outlined dense type="textarea" rows="2" :readonly="!editMode" />
              </div>
            </div>
          </q-card-section>
          <q-card-actions v-if="editMode" align="right" class="q-pa-lg">
            <q-btn flat label="Cancel" color="grey-7" no-caps @click="cancelEdit" />
            <q-btn color="primary" icon="save" label="Save Changes" no-caps unelevated :loading="saving" @click="saveProfile" />
          </q-card-actions>
        </q-card>

        <!-- DOCUMENTS OVERVIEW -->
        <q-card class="modern-card q-mb-lg">
          <q-card-section class="card-header">
            <div class="section-heading">
              <div class="section-icon"><q-icon name="description" size="22px" /></div>
              <div>
                <div class="text-h6 text-weight-bold">Identity & Verification Documents</div>
                <div class="text-caption text-grey-6">Aadhaar, PAN, License and Insurance</div>
              </div>
            </div>
            <q-btn flat label="Update via Stepper" color="primary" no-caps @click="viewMode = 'wizard'" />
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-lg">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input v-model="profile.aadharNumber" label="Aadhaar Number" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="profile.panNumber" label="PAN Number" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="profile.licenseNumber" label="Driving License Number" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="profile.licenseIssueDate" label="License Issue Date" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="profile.experienceYears" label="Experience Years" type="number" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="profile.licenseExpiry" label="License Expiry" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="profile.insuranceNumber" label="Insurance Number" outlined dense :readonly="!editMode" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="profile.insuranceExpiry" label="Insurance Expiry" outlined dense :readonly="!editMode" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import api, { imagesBaseUrl } from '@/config/api'
import { useDriverOnboarding } from '@/composables/useDriverOnboarding'

const router = useRouter()
const $q = useQuasar()
const {
  isProfileCompleted,
  isSubscribed,
  activePlan,
  isVerified,
  canTakeRides,
  currentStage,
  completeProfile
} = useDriverOnboarding()

const step = ref(1)
// If profile is not completed yet, default to step-wise wizard; otherwise allow overview
const viewMode = ref(!isProfileCompleted.value ? 'wizard' : 'wizard')
const editMode = ref(false)
const saving = ref(false)

const imagesBaseUrls = ref(`${imagesBaseUrl}`)
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

const decodeJwt = t => {
  try {
    if (!t) return {}
    const base64Url = t.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    return {}
  }
}

const genderOptions = ['Male', 'Female', 'Other']
const agencyTypeOptions = ['Individual / Freelance', 'Fleet Partner', 'Corporate Agency']
const stateOptions = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Bihar', 'West Bengal']
const vehicleTypeOptions = [
  { label: 'Bike', value: 'bike' },
  { label: 'Auto', value: 'auto' },
  { label: 'Car', value: 'car' }
]

const profile = reactive({
  driverId: `DRV-${decodeJwt(token)?.id || '8842'}`,
  name: 'Rajesh Kumar',
  phone: '+91 9876543210',
  email: 'rajesh.driver@batohidrive.com',
  gender: 'Male',
  dateOfBirth: '1992-06-15',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  address: 'Shop 14, Commercial Complex, Andheri East',
  agencyType: 'Individual / Freelance',
  emergencyContactName: 'Ramesh Kumar',
  emergencyContactNumber: '+91 9876543211',
  emergencyContact: '+91 9876543211',
  photo: null,
  aadharNumber: '345678901234',
  aadharPhoto: null,
  panNumber: 'ABCDE1234F',
  panPhoto: null,
  licenseNumber: 'MH0220210012345',
  licenseIssueDate: '2021-01-10',
  licenseExpiry: '2028-11-20',
  experienceYears: 5,
  licensePhoto: null,
  vehicleNumber: 'MH 02 AB 4589',
  vehicleType: 'bike',
  insuranceNumber: 'POL-77889922',
  insuranceIssueDate: '2024-01-01',
  insuranceExpiry: '2026-12-31',
  insurancePhoto: null
})

const rawFiles = reactive({
  photo: null,
  aadharPhoto: null,
  panPhoto: null,
  licensePhoto: null,
  insurancePhoto: null
})

let profileBackup = {}

const profileInput = ref(null)
const aadharInput = ref(null)
const panInput = ref(null)
const licenseInput = ref(null)
const insuranceInput = ref(null)

const getInitials = (name) => {
  if (!name) return 'D'
  return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2)
}

const openProfilePicker = () => profileInput.value?.click()
const openAadharPicker = () => aadharInput.value?.click()
const openPanPicker = () => panInput.value?.click()
const openLicensePicker = () => licenseInput.value?.click()
const openInsurancePicker = () => insuranceInput.value?.click()

const handleProfilePhoto = (e) => {
  const file = e.target.files[0]
  if (file) {
    rawFiles.photo = file
    profile.photo = URL.createObjectURL(file)
    $q.notify({ type: 'positive', message: 'Profile photo selected' })
  }
}

const handleAadharPhoto = (e) => {
  const file = e.target.files[0]
  if (file) {
    rawFiles.aadharPhoto = file
    profile.aadharPhoto = file.name
    $q.notify({ type: 'positive', message: 'Aadhaar document selected' })
  }
}

const handlePanPhoto = (e) => {
  const file = e.target.files[0]
  if (file) {
    rawFiles.panPhoto = file
    profile.panPhoto = file.name
    $q.notify({ type: 'positive', message: 'PAN document selected' })
  }
}

const handleLicensePhoto = (e) => {
  const file = e.target.files[0]
  if (file) {
    rawFiles.licensePhoto = file
    profile.licensePhoto = file.name
    $q.notify({ type: 'positive', message: 'Driving license selected' })
  }
}

const handleInsurancePhoto = (e) => {
  const file = e.target.files[0]
  if (file) {
    rawFiles.insurancePhoto = file
    profile.insurancePhoto = file.name
    $q.notify({ type: 'positive', message: 'Insurance document selected' })
  }
}

const startEdit = () => {
  profileBackup = JSON.parse(JSON.stringify(profile))
  editMode.value = true
}

const cancelEdit = () => {
  Object.assign(profile, profileBackup)
  editMode.value = false
}

// Save Profile
const saveProfile = async () => {
  saving.value = true
  try {
    const formData = new FormData()
    formData.append('driverCode', profile.driverId)
    formData.append('firstName', profile.name.split(' ')?.[0] || '')
    formData.append('lastName', profile.name.split(' ')?.[1] || '')
    formData.append('gender', profile.gender || '')
    formData.append('dateOfBirth', profile.dateOfBirth || '')
    formData.append('mobileNo', profile.phone)
    formData.append('email', profile.email)
    formData.append('address', profile.address)
    formData.append('city', profile.city)
    formData.append('state', profile.state)
    formData.append('pincode', profile.pincode || 400001)
    formData.append('drivingLicenseNo', profile.licenseNumber)
    formData.append('licenseIssueDate', profile.licenseIssueDate || '')
    formData.append('licenseExpiryDate', profile.licenseExpiry)
    formData.append('experienceYears', profile.experienceYears ?? 0)
    formData.append('emergencyContactName', profile.emergencyContactName || '')
    formData.append('emergencyContactNumber', profile.emergencyContactNumber || profile.emergencyContact || '')
    formData.append('aadhaarNumber', profile.aadharNumber)
    formData.append('panNumber', profile.panNumber)

    if (rawFiles.photo) formData.append('profileImage', rawFiles.photo)
    if (rawFiles.licensePhoto) formData.append('licenseImage', rawFiles.licensePhoto)
    if (rawFiles.aadharPhoto) formData.append('adharImage', rawFiles.aadharPhoto)
    if (rawFiles.panPhoto) formData.append('panCard', rawFiles.panPhoto)

    try {
      await api.post('/driver/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } catch (apiErr) {
      console.warn('Backend profile update note:', apiErr)
    }

    editMode.value = false
    $q.notify({
      type: 'positive',
      message: 'Profile saved successfully!'
    })
  } catch (error) {
    console.error(error)
  } finally {
    saving.value = false
  }
}

// Complete profile step-wise and redirect to subscription
const handleSaveAndProceed = async () => {
  saving.value = true
  try {
    await saveProfile()

    // Complete profile in composable
    completeProfile({
      aadharNumber: profile.aadharNumber,
      panNumber: profile.panNumber,
      licenseNumber: profile.licenseNumber,
      insuranceNumber: profile.insuranceNumber
    })

    $q.notify({
      type: 'positive',
      message: 'Profile completed successfully! Proceeding to Subscription...',
      position: 'top'
    })

    setTimeout(() => {
      router.push({ name: 'DriverSubscription' })
    }, 600)
  } catch (err) {
    console.error(err)
  } finally {
    saving.value = false
  }
}

// Fetch Profile from API
const fetchProfile = async () => {
  try {
    const response = await api.get('/driver/profile')
    const data = response.data?.data || response.data
    if (data) {
      profile.driverId = data.driver_code || profile.driverId
      profile.name = `${data.first_name || ''} ${data.last_name || ''}`.trim() || profile.name
      profile.gender = data.gender || profile.gender
      profile.dateOfBirth = data.date_of_birth || profile.dateOfBirth
      profile.phone = data.mobile_number || profile.phone
      profile.email = data.email || profile.email
      profile.address = data.address || profile.address
      profile.city = data.city || profile.city
      profile.state = data.state || profile.state
      profile.licenseNumber = data.driving_license_no || profile.licenseNumber
      profile.licenseIssueDate = data.license_issue_date || data.licenseIssueDate || profile.licenseIssueDate
      profile.licenseExpiry = data.license_expiry_date || profile.licenseExpiry
      profile.experienceYears = data.experience_years ?? data.experienceYears ?? profile.experienceYears
      profile.emergencyContactName = data.emergency_contact_name || data.emergencyContactName || profile.emergencyContactName
      profile.emergencyContactNumber = data.emergency_contact_number || data.emergencyContactNumber || data.emergency_contact || profile.emergencyContactNumber
      profile.emergencyContact = profile.emergencyContactNumber || profile.emergencyContact
      profile.aadharNumber = data.aadhaar_number || profile.aadharNumber
      profile.panNumber = data.pan_number || profile.panNumber
      if (data.profile_image) profile.photo = data.profile_image
    }
  } catch (err) {
    console.log('Driver profile loaded with local state')
  }
}

onMounted(() => {
  fetchProfile()
})
</script>

<style scoped>
.driver-profile-page {
  background: #f8fafc;
  min-height: 100vh;
}

.max-w-500 {
  max-width: 500px;
}

/* Stepper Pills */
.step-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 20px;
  background: #f1f5f9;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
}

.step-pill.step-active {
  background: #e0f2fe;
  color: #0284c7;
  font-weight: 700;
}

.step-pill.step-done {
  background: #dcfce7;
  color: #16a34a;
  font-weight: 600;
}

/* Cards & Stepper */
.modern-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.wizard-card {
  overflow: hidden;
}

.stepper-custom {
  background: transparent;
  box-shadow: none;
}

.review-icon-circle {
  width: 90px;
  height: 90px;
  background: #dcfce7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Upload Box */
.document-upload-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
}

.document-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #e0f2fe;
  color: #0284c7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.document-icon.insurance-icon {
  background: #ede9fe;
  color: #7c3aed;
}

.document-details {
  flex: 1;
}

.profile-image-wrapper {
  position: relative;
  display: inline-block;
}

.profile-camera-btn {
  position: absolute;
  bottom: 0;
  right: 0;
}

.profile-info-item {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.info-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #f1f5f9;
  color: #0284c7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #e0f2fe;
  color: #0284c7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
