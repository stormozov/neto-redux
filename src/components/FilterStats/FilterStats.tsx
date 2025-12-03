import { useServices } from "@hooks";
import classNames from "classnames";
import styles from "./FilterStats.module.scss";

interface FilterStatsProps {
	className?: string;
}

export default function FilterStats({ className = "" }: FilterStatsProps) {
	const { found, total, isEmptyResult } = useServices();

	return (
		<div className={classNames(styles["filter-stats"], className)}>
			{isEmptyResult ? (
				<span className={styles["filter-stats__not-found"]}>
					Услуги не найдены
				</span>
			) : (
				<span className={styles["filter-stats__text"]}>
					Найдено: {found} из {total} услуг
				</span>
			)}
		</div>
	);
}
