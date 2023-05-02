UNITS = {m: 1.0, ft: 3.28, in: 39.37}
def convert_length(length, from: :m, to: :in)
  # 変換前の単位の長さ / 変換前の単位の比率 * 変換後の単位の比率
  (length / UNITS[from] * UNITS[to]).round(2)
end