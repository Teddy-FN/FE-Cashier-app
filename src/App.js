import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { translationSelect } from "./state/translation";
import { useCookies } from "react-cookie";

// Auth
import Login from "./page/auth/login";
import Register from "./page/auth/register";
import ResetPassword from "./page/auth/reset-password";
import EditProfile from "./page/auth/edit-profile";

// Cashier
import ListProduct from "./page/cashier/list-product"; // List Product Cashier
import MemberCashier from "./page/cashier/member-cashier";

// Admin
import SubCategoryList from "./page/admin/sub-category";
import OverviewPage from "./page/admin/overview";
import CategoryList from "./page/admin/category";
import LocationList from "./page/admin/location";
import MemberList from "./page/admin/member";
import ProductList from "./page/admin/product";
import DiscountList from "./page/admin/discount";
import ShiftList from "./page/admin/shift";
import TypePaymentList from "./page/admin/type-payment";
import SocialMediaList from "./page/admin/social-media";
import InvoiceLogoList from "./page/admin/invoice/invoice-logo";

// Form
import FormCategory from "./page/admin/category/formCategory";
import FormLocation from "./page/admin/location/formLocation";
import FormProduct from "./page/admin/product/formProduct";
import FormSubCategory from "./page/admin/sub-category/form-subcategory";
import FormDiscount from "./page/admin/discount/formDiscount";
import FormShift from "./page/admin/shift/formShift";
import FormTypePayment from "./page/admin/type-payment/formTypePayment";
import FormSocialMedia from "./page/admin/social-media/formSocialMedia";
import FormInvoiceLogo from "./page/admin/invoice/invoice-logo/formInvoiceLogo";

function App() {
  const { i18n } = useTranslation();

  const { translation } = translationSelect();
  const [cookie] = useCookies();

  useEffect(() => {
    if (translation) {
      i18n.changeLanguage(translation);
    }
  }, [translation]);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<QuaifiedPolicies policyTypes={false} />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/edit-profile"
          element={cookie.token ? <EditProfile /> : <Navigate to="/" />}
        />
        <Route path="/home" element={cookie.token ? <ListProduct /> : <Navigate to="/" />} />
        <Route
          path="/membership"
          element={cookie.token ? <MemberCashier /> : <Navigate to="/" />}
        />
        <Route path="/admin-page" element={cookie.token ? <OverviewPage /> : <Navigate to="/" />} />
        <Route
          path="/category-list"
          element={cookie.token ? <CategoryList /> : <Navigate to="/" />}
        />
        <Route
          path="/location-list"
          element={cookie.token ? <LocationList /> : <Navigate to="/" />}
        />
        <Route path="/member-list" element={cookie.token ? <MemberList /> : <Navigate to="/" />} />
        <Route
          path="/product-list"
          element={cookie.token ? <ProductList /> : <Navigate to="/" />}
        />
        <Route
          path="/sub-category-list"
          element={cookie.token ? <SubCategoryList /> : <Navigate to="/" />}
        />
        <Route
          path="/discount-list"
          element={cookie.token ? <DiscountList /> : <Navigate to="/" />}
        />
        <Route path="/shift-list" element={cookie.token ? <ShiftList /> : <Navigate to="/" />} />
        <Route
          path="/type-payment-list"
          element={cookie.token ? <TypePaymentList /> : <Navigate to="/" />}
        />
        <Route
          path="/social-media-list"
          element={cookie.token ? <SocialMediaList /> : <Navigate to="/" />}
        />
        <Route
          path="/logo-invoice-list"
          element={cookie.token ? <InvoiceLogoList /> : <Navigate to="/" />}
        />

        {/* Add Routes */}
        <Route
          path="/add-category"
          element={cookie.token ? <FormCategory /> : <Navigate to="/" />}
        />
        <Route
          path="/add-location"
          element={cookie.token ? <FormLocation /> : <Navigate to="/" />}
        />
        <Route path="/add-product" element={cookie.token ? <FormProduct /> : <Navigate to="/" />} />
        <Route
          path="/add-sub-category"
          element={cookie.token ? <FormSubCategory /> : <Navigate to="/" />}
        />
        <Route
          path="/add-discount"
          element={cookie.token ? <FormDiscount /> : <Navigate to="/" />}
        />
        <Route path="/add-shift" element={cookie.token ? <FormShift /> : <Navigate to="/" />} />
        <Route
          path="/add-type-payment"
          element={cookie.token ? <FormTypePayment /> : <Navigate to="/" />}
        />
        <Route
          path="/add-social-media"
          element={cookie.token ? <FormSocialMedia /> : <Navigate to="/" />}
        />
        <Route
          path="/add-invoice-logo"
          element={cookie.token ? <FormInvoiceLogo /> : <Navigate to="/" />}
        />

        {/* Edit */}
        <Route
          path="/edit-category/:id"
          element={cookie.token ? <FormCategory /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-location/:id"
          element={cookie.token ? <FormLocation /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-product/:id"
          element={cookie.token ? <FormProduct /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-sub-category/:id"
          element={cookie.token ? <FormSubCategory /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-discount/:id"
          element={cookie.token ? <FormDiscount /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-shift/:id"
          element={cookie.token ? <FormShift /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-type-payment/:id"
          element={cookie.token ? <FormTypePayment /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-social-media/:id"
          element={cookie.token ? <FormSocialMedia /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-invoice-logo/:id"
          element={cookie.token ? <FormInvoiceLogo /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
