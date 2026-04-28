import AccountSettings from "../../../components/platform/settings/account-settings";
import BackendStatus from "../../../components/platform/settings/backend-status";
import SettingsPanels from "../../../components/platform/settings/settings-panels";

export default function SettingsPage() {
  return (
    <div className="grid">
      <AccountSettings />
      <SettingsPanels />
      <BackendStatus />
    </div>
  );
}
