import React from "react";
import styles from "./ExhibitionStatus.module.css";
import {
  getExhibitionStatus,
  getStatusClass,
  getStatusInfo,
  getStatusIcon,
} from "../../../utils/exhibitionUtils";

const ExhibitionStatus = ({ exhibition }) => {
  if (!exhibition) {
    return null;
  }

  const status = getExhibitionStatus(exhibition.startDate, exhibition.endDate);
  const statusInfo = getStatusInfo(
    status,
    exhibition.startDate,
    exhibition.endDate
  );
  const statusIcon = getStatusIcon(status);

  return (
    <div className={`${styles.container} ${styles[getStatusClass(status)]}`}>
      <div className={styles.statusMain}>
        <span className={styles.statusIcon}>{statusIcon}</span>
        <span className={styles.statusText}>{status}</span>
      </div>
      {statusInfo && <div className={styles.statusInfo}>{statusInfo}</div>}
    </div>
  );
};

export default ExhibitionStatus;
