-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Jan 2024 pada 15.20
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2204534_susanti_uas_pilkomb`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi_keuangansusanti`
--

CREATE TABLE `transaksi_keuangansusanti` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `amount` bigint(20) NOT NULL,
  `status` enum('debit','kredit') NOT NULL,
  `receiver` varchar(50) NOT NULL,
  `jk` enum('L','P') NOT NULL,
  `no_telp` varchar(15) NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi_keuangansusanti`
--

INSERT INTO `transaksi_keuangansusanti` (`id`, `date`, `description`, `amount`, `status`, `receiver`, `jk`, `no_telp`, `address`) VALUES
(1, '2023-11-10', 'Bayar Cicilan Rumah', 4000000, 'debit', 'Salwa Kinan', 'P', '08123456789', 'Jl. Cikini No. 089'),
(2, '2023-11-17', 'Sewa Ruko', 1000000, 'kredit', 'Nadzwa Nur', 'P', '08234567890', 'Jl. Kulon No. 213'),
(3, '2023-12-01', 'Pengeluaran Listrik', 1500000, 'debit', 'Kartika', 'P', '08345678901', 'Jl. Pasirbuluh No. 1024'),
(4, '2023-12-05', 'Beli Perlengkapan Kantor', 400000, 'debit', 'Revi Fadilah', 'L', '08456789012', 'Jl. Pasar Panorama No. 72'),
(5, '2023-12-10', 'Gaji Bulan Desember', 5200000, 'kredit', 'Baskara Dinata', 'L', '08567890123', 'Jl. Setiabudhi No. 12');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `transaksi_keuangansusanti`
--
ALTER TABLE `transaksi_keuangansusanti`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `transaksi_keuangansusanti`
--
ALTER TABLE `transaksi_keuangansusanti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
